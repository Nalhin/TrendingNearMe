import { TestBed } from '@angular/core/testing';

import { RequestErrorInterceptor } from './request-error.interceptor';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpRequest } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { capitalize } from '../../../shared/utils/capitalize';

describe('ErrorInterceptor', () => {
  let interceptor: RequestErrorInterceptor;
  let snackBar: MatSnackBar;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [RequestErrorInterceptor],
    }),
  );

  beforeEach(() => {
    interceptor = TestBed.inject(RequestErrorInterceptor);
    snackBar = TestBed.inject(MatSnackBar);
  });

  const request = new HttpRequest('GET', '');

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should format text provided as string', (done) => {
    jest.spyOn(snackBar, 'open');
    const message = 'error';
    const next: any = {
      handle: (req: HttpRequest<any>) =>
        of(req).pipe(switchMap(() => throwError({ error: { message } }))),
    };

    interceptor.intercept(request, next).subscribe({
      error: () => {
        expect(snackBar.open).toBeCalledWith(
          capitalize(message),
          expect.any(String),
          expect.any(Object),
        );
        done();
      },
    });
  });

  it('should format errors provided as array', (done) => {
    jest.spyOn(snackBar, 'open');
    const message = ['error', 'error'];
    const next: any = {
      handle: (req: HttpRequest<any>) =>
        of(req).pipe(switchMap(() => throwError({ error: { message } }))),
    };

    interceptor.intercept(request, next).subscribe({
      error: () => {
        expect(snackBar.open).toBeCalledWith(
          'Error. Error',
          expect.any(String),
          expect.any(Object),
        );
        done();
      },
    });
  });

  it('should display unexpected error', (done) => {
    jest.spyOn(snackBar, 'open');
    const next: any = {
      handle: (req: HttpRequest<any>) =>
        of(req).pipe(switchMap(() => throwError({ status: 0 }))),
    };

    interceptor.intercept(request, next).subscribe({
      error: () => {
        expect(snackBar.open).toBeCalledWith(
          'Unexpected error.',
          expect.any(String),
          expect.any(Object),
        );
        done();
      },
    });
  });
});
