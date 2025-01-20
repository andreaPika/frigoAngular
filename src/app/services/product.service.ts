import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${environment.apiBaseUrl}`);
  }

  addProduct(product: any) {
    return this.http.post(`${environment.apiBaseUrl}`, product);
  }

  updateProduct(id: string, product: any) {
    return this.http.put(`${environment.apiBaseUrl}/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.apiBaseUrl}/${id}`);
  }
}
