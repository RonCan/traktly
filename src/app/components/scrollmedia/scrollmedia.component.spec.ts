import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollmediaComponent } from './scrollmedia.component';

describe('ScrollmediaComponent', () => {
  let component: ScrollmediaComponent;
  let fixture: ComponentFixture<ScrollmediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollmediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollmediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
