import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-gestione-frigo';
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('it');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
}
