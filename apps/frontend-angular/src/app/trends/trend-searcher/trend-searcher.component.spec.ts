import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendSearcherComponent } from './trend-searcher.component';

describe('TrendSearcherComponent', () => {
  let component: TrendSearcherComponent;
  let fixture: ComponentFixture<TrendSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrendSearcherComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
