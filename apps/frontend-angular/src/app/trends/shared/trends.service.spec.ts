import { TestBed } from '@angular/core/testing';

import { TrendsService } from './trends.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TrendsService', () => {
  let service: TrendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TrendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
