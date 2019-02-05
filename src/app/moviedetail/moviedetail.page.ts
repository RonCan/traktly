import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {BehaviorSubject} from 'rxjs';
import {TMDBCredits, TMDBMovie} from '../typings/tmdb';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {environment} from '../../environments/environment';
import {UtilsService} from '../services/utils.service';

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
    credits: TMDBCredits;
    images: string[];

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
            }
        );
    }

}
