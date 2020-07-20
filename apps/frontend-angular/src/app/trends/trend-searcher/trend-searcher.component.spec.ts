import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendSearcherComponent } from './trend-searcher.component';
import { SharedModule } from '../../shared/shared.module';
import { MapComponent } from '../shared/map/map.component';
import { TrendCardComponent } from '../shared/trend-card/trend-card.component';
import { TrendCardListComponent } from '../shared/trend-card-list/trend-card-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TrendSearcherComponent', () => {
  let component: TrendSearcherComponent;
  let fixture: ComponentFixture<TrendSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
      declarations: [
        TrendSearcherComponent,
        MapComponent,
        TrendCardComponent,
        TrendCardListComponent,
      ],
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
