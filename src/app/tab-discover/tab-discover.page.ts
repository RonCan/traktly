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
    public played$ = new BehaviorSubject<TrendingMovies>([]);
    public anticipated$ = new BehaviorSubject<TrendingMovies>([]);
    public images = {};

    constructor(public data: DataService) {
    }

    ngOnInit() {
        // TODO config needs to be loaded without this timeout hack
        // TODO this code needs to be refactored
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
            this.initPlayed();
            this.initAnticipated();
        }, 250);
    }

    initPlayed() {
        this.data.getMoviesAt('played/monthly').pipe(
            tap((movies: TrendingMovies) => {
                movies.forEach(({movie: {ids: {tmdb}}}) => {
                    this.images[tmdb] = this.data.getImage(tmdb);
                });
            })
        ).subscribe(this.played$);
    }

    initAnticipated() {
        this.data.getMoviesAt('anticipated').pipe(
            tap((movies: TrendingMovies) => {
                movies.forEach(({movie: {ids: {tmdb}}}) => {
                    this.images[tmdb] = this.data.getImage(tmdb);
                });
            })
        ).subscribe(this.anticipated$);
    }
}
