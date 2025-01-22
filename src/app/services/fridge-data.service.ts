import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FridgeDataService {

  constructor(private http: HttpClient) {}

  // Ottieni le categorie
  getCategories(): Observable<any[]> {
  const token = localStorage.getItem('auth_token'); // Recupera il token JWT

            const headers = new HttpHeaders({
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            });
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/product/categories`, { headers });
  }

  // Ottieni le posizioni del frigo
  getFridgePositions(): Observable<any[]> {
  const token = localStorage.getItem('auth_token'); // Recupera il token JWT

              const headers = new HttpHeaders({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              });
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/product/fridge-positions`, { headers });
  }

  getProducts(): Observable<any[]> {
  const token = localStorage.getItem('auth_token'); // Recupera il token JWT

              const headers = new HttpHeaders({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              });
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/product`, { headers });
  }

  // Metodo per salvare un prodotto
    saveProduct(product: any): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Recupera il token JWT

                const headers = new HttpHeaders({
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                });
      return this.http.post<any>(`${environment.apiBaseUrl}/api/product`, product, { headers });
    }
}
