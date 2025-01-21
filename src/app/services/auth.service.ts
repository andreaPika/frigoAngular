// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User} from '../model/user.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getData() {
    throw new Error('Method not implemented.');
  }
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<User>(`${environment.apiBaseUrl}/api/auth/login`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('auth_token', user?.user?.token!)
                console.log('auth_token', user?.user?.token);
                this.isAuthenticatedSubject.next(true);
                this.currentUserSubject.next(user);
                return user;
            }));

  }

  register(firstName: string, lastName: string, email: string, password: string, role: string) {
    const user = {
      firstName,
      lastName,
      email,
      password,
      role
    };
    return this.http.post(`${environment.apiBaseUrl}/api/auth/register`, user);
  }

  changePassword(userId: string, currentPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Recupera il token JWT dal LocalStorage

      const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Aggiungi altri header se necessari
      });

    return this.http.post(`${environment.apiBaseUrl}/api/auth/change-password`, {
      userId,
      currentPassword,
      newPassword,
    }, { headers });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getUserRoles(): string[] {
    return this.currentUserSubject.value?.roles || [];
  }

  // Metodo per ottenere il token JWT
  getToken(): string | null {
    // Recupera il token JWT salvato nel localStorage
    return localStorage.getItem('auth_token');
  }

  // Metodo per salvare il token JWT nel localStorage
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);  // Salva il token nel localStorage
  }

    // Metodo per recuperare i dati dell'utente autenticato
    getUserData(): any {
        // Supponiamo che i dati dell'utente siano salvati nel localStorage
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;  // Restituisce i dati dell'utente, o null se non esistono
      }

        // Ottieni il ruolo dell'utente dal localStorage o da un altro posto
  getUserRole(): string {
    // Supponiamo che il ruolo dell'utente venga salvato nel localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    return userData.user?.role || '';  // Restituisci il ruolo dell'utente, se disponibile
  }
}
