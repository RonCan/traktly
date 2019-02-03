import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabDiscoverPage } from './tab-discover.page';

describe('TabDiscoverPage', () => {
  let component: TabDiscoverPage;
  let fixture: ComponentFixture<TabDiscoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabDiscoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDiscoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
