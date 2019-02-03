import {Component, Input, OnInit} from '@angular/core';
import {TrendingMovies} from '../../typings/trakt';

@Component({
  selector: 'app-scrollmedia',
  templateUrl: './scrollmedia.component.html',
  styleUrls: ['./scrollmedia.component.scss']
})
export class ScrollmediaComponent implements OnInit {
  @Input() media$;
  @Input() images;
  constructor() { }

  ngOnInit() {
  }

  iOf(movie) {
    return typeof movie;
  }

}
