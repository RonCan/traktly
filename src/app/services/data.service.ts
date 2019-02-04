import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {TMDBImageResult} from '../typings/tmdb';
import {BehaviorSubject} from 'rxjs';
import {Secrets} from '../typings/secrets';
import {environment} from '../../environments/environment';

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
        return this.http.get(`${this.traktEndPoint}/movies/${path}`, {headers: traktHeader});
    }

    getMovieAt(tmdbId: number) {
        return this.http.get(`${this.tmdbEndPoint}/movie/${tmdbId}?api_key=${this.secrets$.value.tmdb_key}`);
    }

    getImage(tmdbId: number) {
        return this.http.get(`${this.tmdbEndPoint}/movie/${tmdbId}/images?api_key=${this.secrets$.value.tmdb_key}`)
            .pipe(
                map((images: TMDBImageResult) => images),
                map(({posters}) => `${this.tmdbImagePath}/w92${posters[0].file_path}`)
            );
    }

    getCredits(tmdbId: number) {
        return this.http.get(`${this.tmdbEndPoint}/movie/${tmdbId}/credits?api_key=${this.secrets$.value.tmdb_key}`);
    }
    getSecrets() {
        if (this.secrets$.value) {
            return this.secrets$;
        } else {
            return this.http.get('secrets.json');
        }
    }
}
