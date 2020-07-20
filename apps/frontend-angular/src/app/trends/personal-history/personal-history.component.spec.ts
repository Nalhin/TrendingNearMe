import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalHistoryComponent } from './personal-history.component';
import { TrendCardListComponent } from '../shared/trend-card-list/trend-card-list.component';
import { SharedModule } from '../../shared/shared.module';
import { MapComponent } from '../shared/map/map.component';
import { TrendCardComponent } from '../shared/trend-card/trend-card.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PersonalHistoryComponent', () => {
  let component: PersonalHistoryComponent;
  let fixture: ComponentFixture<PersonalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [
        PersonalHistoryComponent,
        TrendCardListComponent,
        TrendCardComponent,
        MapComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
