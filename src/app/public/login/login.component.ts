import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { CustomInputComponent } from '@/components';
import { LocalKeys, LocalManagerService } from '@/services';

import { AuthService } from '@/public/login/services';
import { Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';

interface LoginForm {
  user: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup<LoginForm>({
    user: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const token = await firstValueFrom(this.authService.logIn(this.loginForm.getRawValue()));

        LocalManagerService.setElement(LocalKeys.token, token);

        this.router.navigate([AppRoutes.private.root], { replaceUrl: true });
      } catch (e) {
        console.error(e);
      }
    }

    this.loginForm.reset();
  }
}
