import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {TMDBImageResult} from '../typings/tmdb';
import {BehaviorSubject} from 'rxjs';
import {Secrets} from '../typings/secrets';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private secrets$ = new BehaviorSubject<Secrets>({});

    constructor(private http: HttpClient) {
        console.log('Data service constructor called');
        http.get('secrets.json').subscribe(this.secrets$);
        http.get('secrets.json').subscribe(console.log);
    }

    getMoviesAt(path) {
        const traktHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'trakt-api-version': '2',
            'trakt-api-key': this.secrets$.value.trakt_key
        });
        console.log(traktHeader);
        return this.http.get(`https://api.trakt.tv/movies/${path}`, {headers: traktHeader});
    }

    getImage(tmdbId: number) {
        return this.http.get(`https://api.themoviedb.org/3/movie/${tmdbId}/images?api_key=${this.secrets$.value.tmdb_key}`)
            .pipe(
                map((images: TMDBImageResult) => images),
                map(({posters}) => 'https://image.tmdb.org/t/p/w92' + posters[0].file_path)
            );
    }
}
