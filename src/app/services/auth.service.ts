import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated$: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any) {
    return this.http.post(`${environment.apiBaseUrl}/login`, credentials);
  }

  register(data: any) {
    return this.http.post(`${environment.apiBaseUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
