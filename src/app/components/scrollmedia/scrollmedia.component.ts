import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-scrollmedia',
  templateUrl: './scrollmedia.component.html',
  styleUrls: ['./scrollmedia.component.scss']
})
export class ScrollmediaComponent implements OnInit {
  @Input() items;
  @Input() images$;
  @Input() preloaderGif;
  constructor() { }

  ngOnInit() {
  }

}
