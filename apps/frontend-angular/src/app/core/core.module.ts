import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from './interceptors/base-url/base-url.interceptor';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { AuthHeaderInterceptor } from './interceptors/auth-header/auth-header.interceptor';
import { LoadingInterceptor } from './interceptors/loading/loading.interceptor';
import { RequestErrorInterceptor } from './interceptors/request-error/request-error.interceptor';
import { AuthService } from './services/auth/auth.service';

export function initializeAuth(authService: AuthService) {
  return (): Promise<void> => {
    return authService.onInit();
  };
}

@NgModule({
  declarations: [],
  imports: [SharedModule, LayoutModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestErrorInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthService],
      multi: true,
    },
  ],
  exports: [LayoutModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been imported.');
    }
  }
}
