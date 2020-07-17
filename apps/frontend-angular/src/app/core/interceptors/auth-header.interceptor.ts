import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookiesService } from '../services/cookies.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private readonly cookiesService: CookiesService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const apiReq = request.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.cookiesService.getAuthCookie() ?? ""}`,
      }),
    });
    return next.handle(apiReq);
  }
}
