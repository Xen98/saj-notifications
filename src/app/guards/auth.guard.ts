import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LocalManagerService, LocalKeys } from '@/services';
import { AppRoutes } from '@/app.routes';

export const authGuard: CanActivateChildFn = () => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);

  const token = LocalManagerService.getElement(LocalKeys.token);

  if (!token) {
    return router.navigate([AppRoutes.public.login], { replaceUrl: true });
  }

  if (jwtHelper.isTokenExpired(token)) {
    LocalManagerService.clearStorage();
    return router.navigate([AppRoutes.public.login], { replaceUrl: true });
  }

  return true;
};

