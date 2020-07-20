import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { capitalize } from '../../shared/utils/capitalize';


@Injectable()
export class RequestErrorInterceptor implements HttpInterceptor {
  constructor(private readonly snackBar: MatSnackBar) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(catchError((error) => {
        const message = error.status === 0 ? 'Unexpected error.' : error.error.message;
        this.snackBar.open(this.formatErrorMessage(message), 'Close', { duration: 3000 });
        return throwError(error);
      }));
  }

  private formatErrorMessage(errorMessage: string | string[]) {
    return Array.isArray(errorMessage) ? errorMessage.map((m) => capitalize(m)).join('. ') : capitalize(errorMessage);
  }
}
