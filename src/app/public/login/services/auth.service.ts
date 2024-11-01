import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { LogInRequest, LogInResponse } from '@/public/login/models';
import { AuthAdapter } from '@/public/login/adapters';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost/saj_notifications_back';

  http = inject(HttpClient);

  logIn(user: LogInRequest): Observable<string> {
    return this.http.post<LogInResponse>(`${this.baseUrl}/login`, user).pipe(
      map(AuthAdapter)
    );
  }
}
