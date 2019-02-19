import {Component, OnInit} from '@angular/core';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {UtilsService} from '../services/utils.service';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../services/data.service';
import {HistoryMovies, TraktTokenResponse} from '../typings/trakt';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-tab2',
    templateUrl: 'movies.page.html',
    styleUrls: ['movies.page.scss']
})
export class MoviesPage implements OnInit {
    private code: string;
    private token: TraktTokenResponse;
    private myMovies: HistoryMovies;
    private images: string[];

    constructor(private iab: InAppBrowser,
                private utils: UtilsService,
                private route: ActivatedRoute,
                private data: DataService,
                private storage: Storage
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.code = params['code'];
            if (this.code) {
                this.data.getTraktToken(this.code).subscribe(response => this.storage.set('token', response));
            }
        });
        this.storage.get('token').then(token => {
            if (token) {
                this.token = token;
                this.data.getMyWatchedMovies(this.token.access_token).subscribe(
                    (movies) => {
                        this.myMovies = movies;
                        this.images = this.utils.createAndFillArray(movies.length, this.data.preloaderGif);
                    }
                );
            }
        });
    }

    signIn() {
        const browser = this.iab.create(this.utils.getTraktLoginUrl());
    }
}
