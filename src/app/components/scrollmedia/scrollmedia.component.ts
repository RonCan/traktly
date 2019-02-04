import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-scrollmedia',
  templateUrl: './scrollmedia.component.html',
  styleUrls: ['./scrollmedia.component.scss']
})
export class ScrollmediaComponent implements OnInit {
  @Input() media$;
  @Input() images;
  imageLoaded = {};
  constructor() { }

  ngOnInit() {
  }

  imageLoad(id) {
    this.imageLoaded[id] = true;
    console.log(`id ${id} loaded`);
  }

}
