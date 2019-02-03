import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {BehaviorSubject} from 'rxjs';
import {TMDBMovie} from '../typings/tmdb';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-moviedetail',
    templateUrl: './moviedetail.page.html',
    styleUrls: ['./moviedetail.page.scss'],
})
export class MoviedetailPage implements OnInit {
    public detail$ = new BehaviorSubject<TMDBMovie>(null);

    constructor(
        private data: DataService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.detail$ = <BehaviorSubject<TMDBMovie>>this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                this.data.getMovieAt(parseInt(params.get('id')))
            )
        );
    }

}
