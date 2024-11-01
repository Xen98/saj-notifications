import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const AppRoutes = {
  public: {
    root: '',
    login: 'login',
  },
  private: {
    root: 'private',
    notifications: 'notifications',
    countries: 'countries',
    companies: 'companies',
    systems: 'systems',
  },

}

export const routes: Routes = [
  {
    path: AppRoutes.public.root,
    loadChildren: () => import('./public/public.routes').then(m => m.routes)
  },
  {
    path: AppRoutes.private.root,
    canActivateChild: [authGuard],
    loadChildren: () => import('./private/private.routes').then(m => m.routes)
  },
  {
    path: '**',
    redirectTo: AppRoutes.public.root
  }
];
