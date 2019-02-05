import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  createAndFillArray(length: number, filler: any): any[] {
    return new Array(length).fill(filler, 0, length);
  }
}
