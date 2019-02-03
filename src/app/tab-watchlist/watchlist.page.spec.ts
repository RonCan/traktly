import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatclistPage } from './watclist.page';

describe('WatclistPage', () => {
  let component: WatclistPage;
  let fixture: ComponentFixture<WatclistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WatclistPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatclistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
