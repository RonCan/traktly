import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-scrollmedia',
  templateUrl: './scrollmedia.component.html',
  styleUrls: ['./scrollmedia.component.scss']
})
export class ScrollmediaComponent implements OnInit {
  @Input() items;
  @Input() images$;
  @Input() images;
  @Input() preloaderGif;
  constructor(private data: DataService) { }

  ngOnInit() {
  }

  replaceLoadingWithActual(id: number, index) {
    this.data.getPeopleImage(id).subscribe(url => this.images[index] = url);
  }

}
