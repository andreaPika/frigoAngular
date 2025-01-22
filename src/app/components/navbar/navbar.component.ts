import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { Router} from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [TranslateModule, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAuthenticated: boolean = false; // Stato di autenticazione dell'utente
    userRole: string = ''; // Ruolo dell'utente
    currentRoute: string = '';
    isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router, private translateService:TranslateService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authStatus) => {
      console.log('Auth Status Updated:', authStatus);
      this.isAuthenticated = authStatus;
      this.isLoggedIn = true;
      if (this.isAuthenticated) {
        this.userRole = this.authService.getUserRole(); // Ottieni il ruolo dell'utente
      }
    });
  }

  // Funzione di logout
  logout(): void {
    this.authService.logout();// Chiama il metodo logout nel servizio
    this.isLoggedIn = false;
    this.router.navigate(['/login']);  // Reindirizza alla pagina di login
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
  }
}
