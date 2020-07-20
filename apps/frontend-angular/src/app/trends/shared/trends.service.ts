import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CoordinatesDto,
  TrendHistoryDetailsResponseDto,
  TrendHistoryResponseDto,
  TrendResponseDto,
} from '@trends/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrendsService {
  constructor(private readonly httpClient: HttpClient) {}

  public getTrendsByLocation({
    lat,
    lng,
  }: CoordinatesDto): Observable<TrendResponseDto[]> {
    return this.httpClient.get<TrendResponseDto[]>('/trends/location', {
      params: new HttpParams({
        fromObject: {
          lat: String(lat),
          lng: String(lng),
        },
      }),
    });
  }

  public getTrendsHistory(): Observable<TrendHistoryResponseDto[]> {
    return this.httpClient.get<TrendHistoryResponseDto[]>('/trends/history');
  }

  public getTrendDetails(
    id: string,
  ): Observable<TrendHistoryDetailsResponseDto> {
    return this.httpClient.get<TrendHistoryDetailsResponseDto>(
      `/trends/history/${id}`,
    );
  }
}
