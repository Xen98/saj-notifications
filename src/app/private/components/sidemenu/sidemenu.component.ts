import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MenuLinkComponent } from './components';
import { LocalManagerService } from '@/services';
import { Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [MenuLinkComponent],
  templateUrl: './sidemenu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidemenuComponent {
  router = inject(Router);

  logOut() {
    LocalManagerService.clearStorage();

    this.router.navigate([AppRoutes.public.login], { replaceUrl: true });
  }
}
