import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {TMDBCredits, TMDBImageResult, TMDBMovie, TMDBPeopleImages} from '../typings/tmdb';
import {BehaviorSubject, Observable} from 'rxjs';
import {Secrets} from '../typings/secrets';
import {environment} from '../../environments/environment';
import {PopularMovies, TrendingMovies} from '../typings/trakt';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    public secrets$ = new BehaviorSubject<Secrets>(null);
    private traktEndPoint = environment.traktEndPoint;
    private tmdbEndPoint = environment.tmdbEndPoint;
    private tmdbImagePath = environment.tmdbImagePath;
    preloaderGif = 'assets/preloader.gif';
    constructor(private http: HttpClient) {
    }

    getMoviesAt(path: string) {
        const traktHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'trakt-api-version': '2',
            'trakt-api-key': this.secrets$.value.trakt_key
        });
        return <Observable<TrendingMovies & PopularMovies>>this.http.get(`${this.traktEndPoint}/movies/${path}`, {headers: traktHeader});
    }

    getMovieAt(tmdbId: number) {
        return <Observable<TMDBMovie>>this.http.get(`${this.tmdbEndPoint}/movie/${tmdbId}?api_key=${this.secrets$.value.tmdb_key}`);
    }

    imageRequest(tmdbId: number, resource: 'movie' | 'person') {
        return this.http.get(`${this.tmdbEndPoint}/${resource}/${tmdbId}/images?api_key=${this.secrets$.value.tmdb_key}`);
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
        return <Observable<TMDBCredits>>this.http.get(`${this.tmdbEndPoint}/movie/${tmdbId}/credits?api_key=${this.secrets$.value.tmdb_key}`);
    }
    getSecrets(): Observable<Secrets> | BehaviorSubject<Secrets> {
        if (this.secrets$.value) {
            return this.secrets$;
        } else {
            return this.http.get('secrets.json');
        }
    }

    getPeopleImage(tmdbId: number) {
        return this.imageRequest(tmdbId, 'person').pipe(
            map((person: TMDBPeopleImages) => person.profiles.length ? this.buildTMDBImageString('w92', person.profiles[0].file_path) : this.preloaderGif)
        );
    }
}
