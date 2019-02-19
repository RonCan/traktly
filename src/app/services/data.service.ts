import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, delayWhen, map, retryWhen, shareReplay, switchMap, tap} from 'rxjs/operators';
import {Storage} from '@ionic/storage';
import {
    TMDBCredits,
    TMDBImageResult,
    TMDBMovie,
    TMDBPeopleImages,
    TMDBPerson,
    TMDBPersonMovieCredits,
    TMDBRecommendedMovies
} from '../typings/tmdb';
import {BehaviorSubject, Observable, of, throwError, timer} from 'rxjs';
import {Secrets} from '../typings/secrets';
import {environment} from '../../environments/environment';
import {HistoryMovies, PopularMovies, TraktTokenRequestBody, TraktTokenResponse, TraktUserSettings, TrendingMovies} from '../typings/trakt';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    public secrets$ = new BehaviorSubject<Secrets>(null);
    public UserInfo$ = new BehaviorSubject<TraktUserSettings>(null);
    public traktToken$ = new BehaviorSubject<TraktTokenResponse>(null);
    preloaderGif = 'assets/preloader.gif';
    traktHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'trakt-api-version': '2'
    });
    private traktEndPoint = environment.traktEndPoint;
    private tmdbEndPoint = environment.tmdbEndPoint;
    private tmdbImagePath = environment.tmdbImagePath;
    private traktTokenEndpoint = environment.traktTokenEndPoint;

    constructor(private http: HttpClient, private storage: Storage) {
    }

    getMoviesAt(path: string) {
        this.checkAndSetTraktHeaders();
        return this.http.get<TrendingMovies & PopularMovies>(
            `${this.traktEndPoint}/movies/${path}`, {headers: this.traktHeader}
        ).pipe(
            shareReplay(),
            retryWhen(this.thereWillBeErrors),
            catchError(this.handleError) // then handle the error
        );
    }

    getMovieAt(tmdbId: number) {
        return this.http.get<TMDBMovie>(
            `${this.tmdbEndPoint}/movie/${tmdbId}?api_key=${this.secrets$.value.tmdb_key}`
        ).pipe(
            shareReplay(),
            retryWhen(this.thereWillBeErrors),
            catchError(this.handleError) // then handle the error
        );
    }

    imageRequest(tmdbId: number, resource: 'movie' | 'person') {
        return this.http.get(
            `${this.tmdbEndPoint}/${resource}/${tmdbId}/images?api_key=${this.secrets$.value.tmdb_key}`
        ).pipe(
            shareReplay(),
            retryWhen(this.thereWillBeErrors),
            catchError(this.handleError) // then handle the error
        );
    }

    getImage(tmdbId: number): Observable<string> {
        return this.imageRequest(tmdbId, 'movie')
            .pipe(
                map((movie: TMDBImageResult) => this.buildTMDBImageString('w92', movie.posters[0].file_path))
            );
    }

    buildTMDBImageString(size: string, file_path: string) {
        return `${this.tmdbImagePath}/${size}${file_path}`;
    }

    getCredits(tmdbId: number) {
        return this.http.get<TMDBCredits>(
            `${this.tmdbEndPoint}/movie/${tmdbId}/credits?api_key=${this.secrets$.value.tmdb_key}`
        ).pipe(
            shareReplay(),
            retryWhen(this.thereWillBeErrors),
            catchError(this.handleError) // then handle the error
        );
    }

    getSecrets(): Observable<Secrets> | BehaviorSubject<Secrets> {
        if (this.secrets$.value) {
            return this.secrets$;
        } else {
            return this.http.get('secrets.json');
        }
    }

    getTraktToken(authCode: string) {
        const body: TraktTokenRequestBody = {
            code: authCode,
            client_id: this.secrets$.value.trakt_key,
            client_secret: this.secrets$.value.trakt_secret,
            redirect_uri: environment.traktRedirectUri,
            grant_type: 'authorization_code'
        };
        return this.http.post<TraktTokenResponse>(this.traktTokenEndpoint, body);
    }

    getMyWatchedMovies(token: string) {
        this.checkAndSetTraktHeaders();
        this.traktHeader = this.traktHeader.set('Authorization', `Bearer ${token}`);
        return this.http.get<HistoryMovies>(`${this.traktEndPoint}/users/me/history/movies`, {headers: this.traktHeader});
    }

    getPersonDetail(tmdbId: number) {
        return this.http.get<TMDBPerson>(
            `${this.tmdbEndPoint}/person/${tmdbId}?api_key=${this.secrets$.value.tmdb_key}`
        ).pipe(
            shareReplay(),
            retryWhen(this.thereWillBeErrors),
            catchError(this.handleError) // then handle the error
        );
    }

    getPersonCredits(tmdbId: number) {
        return this.http.get<TMDBPersonMovieCredits>(
            `${this.tmdbEndPoint}/person/${tmdbId}/movie_credits?api_key=${this.secrets$.value.tmdb_key}`
        ).pipe(
            shareReplay(),
            retryWhen(this.thereWillBeErrors),
            catchError(this.handleError) // then handle the error
        );
    }

    getPersonImage(tmdbId: number) {
        return this.imageRequest(tmdbId, 'person').pipe(
            map(
                (person: TMDBPeopleImages) => {
                    return person.profiles.length ? this.buildTMDBImageString('w92', person.profiles[0].file_path) : this.preloaderGif;
                }
            )
        );
    }

    getSimilarFromTMDB(tmdbId: number) {
        return this.http.get<TMDBRecommendedMovies>(
            `${this.tmdbEndPoint}/movie/${tmdbId}/recommendations?api_key=${this.secrets$.value.tmdb_key}`
        ).pipe(
            shareReplay(),
            retryWhen(this.thereWillBeErrors),
            catchError(this.handleError) // then handle the error
        );
    }

    getTraktSettings() {
        this.storage.get('user')
            .then(user => {
                if (user) {
                    this.UserInfo$.next(user);
                    return;
                }
                this.storage.get('token').
                then(token => {
                    if (!token) {
                        return console.error('You have not logged in');
                    }
                    this.traktToken$.next(token);
                    this.checkAndSetTraktHeaders(token);
                    this.http.get<TraktUserSettings>(`${this.traktEndPoint}/users/settings`, {headers: this.traktHeader}).subscribe(settings => {
                        this.UserInfo$.next(settings);
                        this.storage.set('user', settings);
                        console.log(settings);
                    });
                });
            });
    }

    checkAndSetTraktHeaders(token?: boolean) {
        if (this.traktHeader.get('trakt-api-key') && this.traktHeader.get('Authorization')) {
            return;
        }
        if (token && !this.traktHeader.get('Authorization')) {
            this.traktHeader = this.traktHeader.set('Authorization', 'Bearer ' + this.traktToken$.value.access_token);
        }
        if (!this.traktHeader.get('trakt-api-key')) {
            this.traktHeader = this.traktHeader.set('trakt-api-key', this.secrets$.value.trakt_key);
        }
    }

    thereWillBeErrors(errors) {
        return errors
            .pipe(
                switchMap((x: any) => {
                    if (x.status === 429) {
                        return of(x);
                    }
                    throwError(x);
                }),
                tap((error) => console.log(error)),
                delayWhen(() => timer(2000)),
                tap(() => console.log('retrying...'))
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}
