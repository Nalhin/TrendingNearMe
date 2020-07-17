import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TrendHistoryDetailsResponseDto,
} from '@trends/data';
import { Observable, Subscription } from 'rxjs';
import { filter, map, share, switchMap } from 'rxjs/operators';
import { TrendsService } from '../shared/trends.service';
import * as L from 'leaflet';
import { customMarkerFactory } from '../shared/custom-marker.model';

@Component({
  selector: 'trends-personal-history',
  templateUrl: './personal-history.component.html',
  styleUrls: ['./personal-history.component.scss'],
})
export class PersonalHistoryComponent implements OnInit, OnDestroy {
  trendHistoryDetails: TrendHistoryDetailsResponseDto;
  markers$: Observable<L.Marker[]>;
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly trendsService: TrendsService,
  ) {
  }

  ngOnInit(): void {
    this.markers$ = this.trendsService
      .getTrendsHistory()
      .pipe(
        map((trends) =>
          trends.map((trend) => customMarkerFactory(trend.coordinates, trend.created, { markerId: trend._id }),
          ),
        ));

    const routeIdObservable = this.route.paramMap.pipe(
      map((params) =>
        params.get('id'),
      ), share());

    this.subscriptions.push(routeIdObservable.pipe(filter((id) => Boolean(id)),
      switchMap((id) => this.trendsService.getTrendDetails(id)))
      .subscribe((details) => {
        this.trendHistoryDetails = details;
      }));
    this.subscriptions.push(routeIdObservable.pipe(filter((id) => !Boolean(id))).subscribe(() => {
      this.trendHistoryDetails = null;
    }));

  }


  onPopupOpen(markerId: string): void {
    this.router.navigate([`../${markerId}`], { relativeTo: this.route });
  }

  onPopupClose(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
