import { IInternetTariff } from '@/types/internetTarrif';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InternetService {
  constructor(private http: HttpClient) {}

  // Load mock data from JSON file
  getInternetOffers(): Observable<IInternetTariff[]> {
    return this.http
      .get<IInternetTariff[]>('/assets/mocks/internet.mock.json')
      .pipe(map((data) => data));
  }
}
