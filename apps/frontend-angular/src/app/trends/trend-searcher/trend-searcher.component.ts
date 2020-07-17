import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CoordinatesDto, TrendResponseDto } from '@trends/data';
import { TrendsService } from '../shared/trends.service';
import * as L from 'leaflet';
import { customMarkerFactory } from '../shared/custom-marker.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'trends-trend-searcher',
  templateUrl: './trend-searcher.component.html',
  styleUrls: ['./trend-searcher.component.scss'],
})
export class TrendSearcherComponent {
  trends$: Observable<TrendResponseDto[]>;
  markers:L.Marker[] = []

  constructor(private readonly trendsService: TrendsService) {}

  searchTrends(location: CoordinatesDto) {
    this.trends$ = this.trendsService.getTrendsByLocation(location)
      .pipe(tap(()=> this.markers = [customMarkerFactory(location,"Current search")]));

  }
}
