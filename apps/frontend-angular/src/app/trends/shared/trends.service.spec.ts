import { TestBed } from '@angular/core/testing';

import { TrendsService } from './trends.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {
  coordinatesDtoBuilder,
  trendHistoryDetailsResponseDtoBuilder,
  trendHistoryResponseDtoBuilder,
  trendResponseDtoBuilder,
} from '@trends/fixtures';

describe('TrendsService', () => {
  let service: TrendsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TrendsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('getTrendsByLocation', () => {
    const response = trendResponseDtoBuilder.buildMany(3);

    it('should return trends near given location', (done) => {
      const coords = coordinatesDtoBuilder.buildOne()

      service.getTrendsByLocation(coords).subscribe((res) => {
        expect(res).toBe(response);
        done();
      });

      const req = httpTestingController.expectOne(`/trends/location?lat=${coords.lat}&lng=${coords.lng}`);
      req.flush(response);
    });
  });

  describe('getTrendsHistory', () => {
    const response = trendHistoryResponseDtoBuilder.buildMany(3);

    it('should return trend history', (done) => {
      service.getTrendsHistory().subscribe((res) => {
        expect(res).toBe(response);
        done();
      });

      const req = httpTestingController.expectOne('/trends/history');
      req.flush(response);
    });
  });

  describe('getTrendDetails', () => {
    const response = trendHistoryDetailsResponseDtoBuilder.buildOne();

    it('should return trend details', (done) => {
      const id = '1';

      service.getTrendDetails(id).subscribe((res) => {
        expect(res).toBe(response);
        done();
      });

      const req = httpTestingController.expectOne(`/trends/history/${id}`);
      req.flush(response);
    });
  });
});
