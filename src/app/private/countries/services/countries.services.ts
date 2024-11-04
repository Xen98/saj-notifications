import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';

import { Country, CountriesResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  http = inject(HttpClient);

  state = signal({
    countries: [] as Country[],
  });

  private readonly baseUrl = 'http://localhost/saj_notifications_back';

  getCountries() {
    this.http.get<CountriesResponse>(`${this.baseUrl}/countries`).pipe(
      catchError(error => {
        console.error(error)

        return of(
          {
            message: error,
            data: []
          } as CountriesResponse
        )
      })
    ).subscribe(resp => {
      this.state.set({
        countries: resp.data
      })
    })
  }
}
