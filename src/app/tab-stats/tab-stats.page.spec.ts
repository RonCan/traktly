import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabStatsPage } from './tab-stats.page';

describe('TabStatsPage', () => {
  let component: TabStatsPage;
  let fixture: ComponentFixture<TabStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabStatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
