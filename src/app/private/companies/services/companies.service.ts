import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';

import { Company, CompaniesResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  http = inject(HttpClient);

  state = signal({
    companies: [] as Company[],
  });

  private readonly baseUrl = 'http://localhost/saj_notifications_back';

  getCompanies() {
    this.http.get<CompaniesResponse>(`${this.baseUrl}/companies`).pipe(
      catchError(error => {
        console.error(error)

        return of(
          {
            message: error,
            data: []
          } as CompaniesResponse
        )
      })
    ).subscribe(resp => {
      this.state.set({
        companies: resp.data
      })
    })
  }
}
