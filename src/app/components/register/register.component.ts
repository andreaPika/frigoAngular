import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-register',
  imports: [TranslateModule, RouterModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    role: string = '';


  roles =  ['admin', 'users']; // Ruoli disponibili

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      alert('Compila tutti i campi obbligatori.');
      return;
    }

    this.authService.register(this.firstName, this.lastName, this.email, this.password, 'users').subscribe(
      (response) => {
        console.log('Registrazione completata:', response);
        alert('Utente registrato con successo!');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Errore durante la registrazione:', error);
        alert('Si è verificato un errore durante la registrazione.');
      }
    );

 }
}

