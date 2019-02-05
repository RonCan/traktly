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
    images$ = {};

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
                    let delay = 0;
                    this.credits$.next(credits);
                    credits.cast.forEach(member => {
                        delay += 300;
                        (((member1, del) => {
                            setTimeout(() => {
                                this.data.getPeopleImage(member.id).subscribe(url => this.images$[member.id] = url);
                            }, del);
                        }))(member, delay);
                    });
                });
                this.detail$ = <BehaviorSubject<TMDBMovie>>this.data.getMovieAt(this.id);
            }
        );
    }

}
