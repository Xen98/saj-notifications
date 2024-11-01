import { AppRoutes } from "@/app.routes";
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./public.component').then(m => m.PublicComponent),
    children: [
      {
        path: AppRoutes.public.login,
        loadComponent: () => import('./login/login.component').then(m => m.LoginPageComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: `/${AppRoutes.private.root}`,
      }
    ]
  }
]
