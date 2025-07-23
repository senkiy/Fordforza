import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { Home } from './features/home/home';
import { Cars } from './features/cars/cars';
import { About } from './features/about/about';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'cars', component: Cars },
    { path: 'about', component: About },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./pages/login/login.component').then(m => m.LoginComponent);
        }
    },
    {
        path: 'Inicio',
        pathMatch: 'full',
        canActivate: [loginGuard],
        loadComponent: () => {
            return import('./pages/Inicio/Inicio').then(m => m.InicioComponent);
        }
    },
    {
        path: 'dashboard',
        pathMatch: 'full',
        canActivate: [loginGuard],
        loadComponent: () => {
            return import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent);
        }
    }
];
