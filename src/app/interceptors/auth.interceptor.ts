import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { EMPTY } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

import { LocalManagerService, LocalKeys } from "@/services";
import { AppRoutes } from "@/app.routes";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);

  const token = LocalManagerService.getElement(LocalKeys.token);

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    if (jwtHelper.isTokenExpired(token)) {
      LocalManagerService.clearStorage();

      router.navigate([AppRoutes.public.login], { replaceUrl: true });

      return EMPTY;
    }

    return next(authReq);
  }

  return next(req);
};
