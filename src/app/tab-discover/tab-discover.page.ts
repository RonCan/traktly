import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DataService} from '../services/data.service';
import {PopularMovies, TrendingMovies} from '../typings/trakt';
import {tap} from 'rxjs/operators';
import {UtilsService} from '../services/utils.service';

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
    public images$ = {};
    public trendingDummyImages: string[];
    public popularDummyImages: string[];
    public playedDummyImages: string[];
    public anticipatedDummyImages: string[];

    constructor(private data: DataService, private utils: UtilsService) {
    }

    ngOnInit() {
        // TODO this code needs to be refactored
            this.data.getMoviesAt('trending').pipe(
                tap((movies) => this.trendingDummyImages = this.utils.createAndFillArray(movies.length, this.data.preloaderGif))
            ).subscribe(this.trending$);
            this.data.getMoviesAt('popular').pipe(
                tap((movies) => this.popularDummyImages = this.utils.createAndFillArray(movies.length, this.data.preloaderGif))
            ).subscribe(this.popular$);
            this.initPlayed();
            this.initAnticipated();
    }

    initPlayed() {
        this.data.getMoviesAt('played/monthly').pipe(
            tap((movies) => this.playedDummyImages = this.utils.createAndFillArray(movies.length, this.data.preloaderGif))
        ).subscribe(this.played$);
    }

    initAnticipated() {
        this.data.getMoviesAt('anticipated').pipe(
            tap((movies) => this.anticipatedDummyImages = this.utils.createAndFillArray(movies.length, this.data.preloaderGif))
        ).subscribe(this.anticipated$);
    }
}
