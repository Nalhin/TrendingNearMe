import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendCardListComponent } from './trend-card-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trendResponseDtoBuilder } from '@trends/fixtures';
import { TrendCardComponent } from '../trend-card/trend-card.component';

describe('TrendCardListComponent', () => {
  let component: TrendCardListComponent;
  let fixture: ComponentFixture<TrendCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule],
      declarations: [TrendCardListComponent, TrendCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendCardListComponent);
    component = fixture.componentInstance;
    component.trends = trendResponseDtoBuilder.buildMany(3);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
