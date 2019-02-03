import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviedetailPage } from './moviedetail.page';

describe('MoviedetailPage', () => {
  let component: MoviedetailPage;
  let fixture: ComponentFixture<MoviedetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviedetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviedetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
