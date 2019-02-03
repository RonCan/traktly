import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DataService} from '../services/data.service';
import {PopularMovies, TrendingMovies} from '../typings/trakt';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-tab-discover',
    templateUrl: './tab-discover.page.html',
    styleUrls: ['./tab-discover.page.scss'],
})
export class TabDiscoverPage implements OnInit {
    public trending$ = new BehaviorSubject<TrendingMovies>([]);
    public popular$ = new BehaviorSubject<PopularMovies>([]);
    public images = {};

    constructor(public data: DataService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.data.getMoviesAt('trending').pipe(
                tap((movies: TrendingMovies) => {
                    movies.forEach(({movie: {ids: {tmdb}}}) => {
                        this.images[tmdb] = this.data.getImage(tmdb);
                    });
                })
            ).subscribe(this.trending$);
            this.data.getMoviesAt('popular').pipe(
                tap((movies: PopularMovies) => {
                    movies.forEach(({ids: {tmdb}}) => {
                        this.images[tmdb] = this.data.getImage(tmdb);
                    });
                })
            ).subscribe(this.popular$);
        }, 250);
    }
}
