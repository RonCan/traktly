import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {BehaviorSubject} from 'rxjs';
import {TMDBCredits, TMDBMovie} from '../typings/tmdb';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-moviedetail',
    templateUrl: './moviedetail.page.html',
    styleUrls: ['./moviedetail.page.scss'],
})
export class MoviedetailPage implements OnInit {
    detail$ = new BehaviorSubject<TMDBMovie>(null);
    defaultHref = '';
    tmdbImagePath = environment.tmdbImagePath;
    id: number;
    credits$ = new BehaviorSubject<TMDBCredits>(null);
    images: string[];

    constructor(
        public data: DataService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
                this.id = parseInt(params.get('id'));
                console.log(this.id);
                this.data.getCredits(this.id).subscribe((credits: TMDBCredits) => {
                    this.credits$.next(credits);
                    this.images = new Array(credits.cast.length);
                    this.images.fill(this.data.preloaderGif, 0, credits.cast.length - 1);
                });
                this.detail$ = <BehaviorSubject<TMDBMovie>>this.data.getMovieAt(this.id);
            }
        );
    }

}
