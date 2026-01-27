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
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/product/categories`, { headers: this.getAuthHeaders() });
  }

  // Ottieni le posizioni del frigo
  getFridgePositions(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/product/fridge-positions`, { headers: this.getAuthHeaders() });
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/product`, { headers: this.getAuthHeaders() });
  }

  // Metodo per salvare un prodotto
    saveProduct(product: any): Observable<any> {
      return this.http.post<any>(`${environment.apiBaseUrl}/api/product`, product, { headers: this.getAuthHeaders() });
    }

   deleteProduct(productId: string): Observable<any> {
      return this.http.delete<any>(`${environment.apiBaseUrl}/api/product/${productId}`, { headers: this.getAuthHeaders() });
    }


    // Aggiorna la quantità di un prodotto
      updateQuantity(productId: string, quantity: number): Observable<any> {
        return this.http.put(`${environment.apiBaseUrl}/api/product/qnt/${productId}`, { quantity }, { headers: this.getAuthHeaders() });
      }

      saveCategory(category: any): Observable<any> {
        return this.http.post(
          `${environment.apiBaseUrl}/api/product/categories`,
          category,
          { headers: this.getAuthHeaders() }
        );
      }

     deleteCategory(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.apiBaseUrl}/api/product/categories/${id}`, { headers: this.getAuthHeaders() });
      }


      saveFridgePosition(position: any): Observable<any> {
        return this.http.post(
          `${environment.apiBaseUrl}/api/product/fridge-positions`,
          position,
          { headers: this.getAuthHeaders() }
        );
      }

    deleteFridgePosition(id: number): Observable<any> {
      return this.http.delete<any>(`${environment.apiBaseUrl}/api/product/fridge-positions/${id}`, { headers: this.getAuthHeaders() });
    }



      private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('auth_token');
        return new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });
      }

}
