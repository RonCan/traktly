import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {BehaviorSubject} from 'rxjs';
import {TMDBCredits, TMDBMovie, TMDBMovieBrief, TMDBRecommendedMovies} from '../typings/tmdb';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {environment} from '../../environments/environment';
import {UtilsService} from '../services/utils.service';
import {strategy} from '@angular-devkit/core/src/experimental/jobs';

@Component({
    selector: 'app-moviedetail',
    templateUrl: './moviedetail.page.html',
    styleUrls: ['./moviedetail.page.scss'],
})
export class MoviedetailPage implements OnInit {
    detail$ = new BehaviorSubject<TMDBMovie>(null);
    recommended$ = new BehaviorSubject<TMDBMovieBrief[]>(null);
    defaultHref = '';
    tmdbImagePath = environment.tmdbImagePath;
    id: number;
    credits: TMDBCredits;
    images: string[];
    recommdendedImages: string[] = [];

    constructor(
        public data: DataService,
        private route: ActivatedRoute,
        private utils: UtilsService
    ) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
                this.id = parseInt(params.get('id'));
                this.data.getCredits(this.id).subscribe((credits: TMDBCredits) => {
                    this.credits = credits;
                    this.images = this.utils.createAndFillArray(credits.cast.length, this.data.preloaderGif);
                });
                this.detail$ = <BehaviorSubject<TMDBMovie>>this.data.getMovieAt(this.id);
                this.data.getSimilarFromTMDB(this.id).subscribe(movies => {
                    this.recommended$.next(movies.results);
                    movies.results.forEach(movie => this.recommdendedImages.push(this.data.buildTMDBImageString('w92', movie.poster_path)));
                });
            }
        );
    }

}
