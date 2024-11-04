import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';

import { System, SystemsResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SystemsService {
  http = inject(HttpClient);

  state = signal({
    systems: [] as System[],
  });

  private readonly baseUrl = 'http://localhost/saj_notifications_back';

  getSystems() {
    this.http.get<SystemsResponse>(`${this.baseUrl}/systems`).pipe(
      catchError(error => {
        console.error(error)

        return of(
          {
            message: error,
            data: []
          } as SystemsResponse
        )
      })
    ).subscribe(resp => {
      this.state.set({
        systems: resp.data
      })
    })
  }
}
