import { TestBed } from '@angular/core/testing';

import { HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';
import { LoadingInterceptor } from './loading.interceptor';
import { LoadingService } from '../../services/loading/loading.service';

describe('LoadingInterceptor', () => {
  let interceptor: LoadingInterceptor;
  let requestLoadingService: LoadingService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [LoadingInterceptor],
    }),
  );

  beforeEach(() => {
    interceptor = TestBed.inject(LoadingInterceptor);
    requestLoadingService = TestBed.inject(LoadingService);
  });

  const next: any = {
    handle: (req: HttpRequest<any>) => of(req),
  };
  const request = new HttpRequest('GET', '');

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should increment loading requests when initialized', (done) => {
    jest.spyOn(requestLoadingService, 'incrementLoadingRequests');

    interceptor.intercept(request, next).subscribe(() => {
      expect(requestLoadingService.incrementLoadingRequests).toBeCalledTimes(1);
      done();
    });
  });

  it('should decrement loading requests after finalization', () => {
    jest.spyOn(requestLoadingService, 'incrementLoadingRequests');
    jest.spyOn(requestLoadingService, 'decrementLoadingRequests');

    interceptor.intercept(request, next).subscribe(() => {
      expect(requestLoadingService.decrementLoadingRequests).toBeCalledTimes(1);
    });

    expect(requestLoadingService.incrementLoadingRequests).toBeCalledTimes(1);
  });
});
