import {Component, Input} from '@angular/core';
import {TMDBMovie} from '../typings/tmdb';

@Component({
  selector: 'app-watchlist',
  templateUrl: 'watchlist.page.html',
  styleUrls: ['watchlist.page.scss']
})
export class WatclistPage {
  @Input() movie: TMDBMovie;
}
