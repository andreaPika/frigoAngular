import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FridgeDataService {

  constructor(private http: HttpClient) {}

  // Ottieni le categorie
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/categories`);
  }

  // Ottieni le posizioni del frigo
  getFridgePositions(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/fridge-positions`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/products`);
  }
}
