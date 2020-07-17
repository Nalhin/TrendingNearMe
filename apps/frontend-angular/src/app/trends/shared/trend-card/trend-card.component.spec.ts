import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendCardComponent } from './trend-card.component';
import { SharedModule } from '../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trendResponseDtoBuilder } from '@trends/fixtures';

describe('TrendCardComponent', () => {
  let component: TrendCardComponent;
  let fixture: ComponentFixture<TrendCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule],
      declarations: [TrendCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendCardComponent);
    component = fixture.componentInstance;
    component.trend = trendResponseDtoBuilder.buildOne()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
