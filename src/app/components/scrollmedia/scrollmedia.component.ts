import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-scrollmedia',
  templateUrl: './scrollmedia.component.html',
  styleUrls: ['./scrollmedia.component.scss']
})
export class ScrollmediaComponent implements OnInit {
  @Input() items;
  @Input() images: string[];
  @Input() related: boolean;
  @Input() fromPeople: boolean;
  constructor(private data: DataService) { }

  ngOnInit() {
  }

  replaceLoadingWithActual(resource: 'movies' | 'people', id: number, index) {
    switch (resource) {
      case 'movies':
        this.data.getImage(id).subscribe(url => this.images[index] = url);
        break;
      case 'people':
        this.data.getPersonImage(id).subscribe(url => this.images[index] = url);
        break;
      default:
        return;
    }
  }

}
