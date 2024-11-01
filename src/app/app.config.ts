import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { routes } from '@/app.routes';
import { authInterceptor } from '@/interceptors';
import { LocalKeys, LocalManagerService } from './services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => LocalManagerService.getElement(LocalKeys.token),
          allowedDomains: ['localhost'],
          disallowedRoutes: ['http://localhost/saj_notifications_back/login']
        }
      })
    )
  ]
};
