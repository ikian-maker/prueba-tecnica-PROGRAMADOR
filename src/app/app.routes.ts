import { Routes } from '@angular/router';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { BotonDePagosComponent } from './components/boton-de-pagos/boton-de-pagos.component';



export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login',component: LoginComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'boton-de-pagos', component: BotonDePagosComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];