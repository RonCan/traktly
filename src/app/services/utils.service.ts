import { Injectable } from '@angular/core';
import {DataService} from './data.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private traktRedirect: string;
  private traktOauthEndPoint: string;
  constructor(private data: DataService) {
    this.traktRedirect = environment.traktRedirectUri;
    this.traktOauthEndPoint = environment.traktOAuthEndPoint;
  }

  createAndFillArray(length: number, filler: any): any[] {
    return new Array(length).fill(filler, 0, length);
  }

  getTraktLoginUrl() {
    return `${this.traktOauthEndPoint}?response_type=code&client_id=${this.data.secrets$.value.trakt_key}&redirect_uri=${this.traktRedirect}`;
  }
}
