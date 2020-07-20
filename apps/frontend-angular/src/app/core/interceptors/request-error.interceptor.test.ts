import { TestBed } from '@angular/core/testing';

import { HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';
import { RequestErrorInterceptor } from './request-error.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ErrorInterceptor', () => {
  let interceptor: RequestErrorInterceptor;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [RequestErrorInterceptor],
    }),
  );

  beforeEach(() => {
    interceptor = TestBed.inject(RequestErrorInterceptor);
  });

  const next: any = {
    handle: (req: HttpRequest<any>) => of(req),
  };
  const request = new HttpRequest('GET', '');

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
