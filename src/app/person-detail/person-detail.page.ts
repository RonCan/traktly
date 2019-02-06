import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TMDBPerson, TMDBPersonMovieCredits} from '../typings/tmdb';
import {DataService} from '../services/data.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
    selector: 'app-person-detail',
    templateUrl: './person-detail.page.html',
    styleUrls: ['./person-detail.page.scss'],
})
export class PersonDetailPage implements OnInit {
    defaultHref = '';
    detail$ = new BehaviorSubject<TMDBPerson>(null);
    credits$ = new BehaviorSubject<TMDBPersonMovieCredits>(null);
    id: number;
    movieImages: string[] = [];
    constructor(public data: DataService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = parseInt(params.get('id'));
            this.detail$ = <BehaviorSubject<TMDBPerson>>this.data.getPersonDetail(this.id);
            this.data.getPersonCredits(this.id).subscribe(credits => {
                this.credits$.next(credits);
                credits.cast.forEach(item => {this.movieImages.push(this.data.buildTMDBImageString('w92', item.poster_path)); });
            });
        });
    }
}
