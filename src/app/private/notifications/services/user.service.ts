import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'http://localhost/saj_notifications_back';

  http = inject(HttpClient);

  getUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/user`);
  }
}
