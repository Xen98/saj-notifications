import { AppRoutes } from "@/app.routes";
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./private.component').then(m => m.PrivateComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AppRoutes.private.notifications
      },
      {
        path: AppRoutes.private.notifications,
        loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent)
      },
      {
        path: AppRoutes.private.companies,
        loadComponent: () => import('./companies/companies.component').then(m => m.CompaniesComponent)
      },
      {
        path: AppRoutes.private.countries,
        loadComponent: () => import('./countries/countries.component').then(m => m.CountriesComponent)
      },
      {
        path: AppRoutes.private.systems,
        loadComponent: () => import('./systems/systems.component').then(m => m.SystemsComponent)
      },
      {
        path: '**',
        redirectTo: AppRoutes.private.notifications
      }
    ]
  }
]
