import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components//homepage/homepage.component';
import { ProductsComponent } from './components//products/products.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'search', component: ProductsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use RouterModule.forRoot
  exports: [RouterModule], // Export RouterModule
})
export class AppRoutingModule {}
