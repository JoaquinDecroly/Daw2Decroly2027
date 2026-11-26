import { Routes } from '@angular/router';
import { ListaUsuarios } from './pages/lista-usuarios/lista-usuarios';
import { Formulario } from './pages/formulario/formulario';

export const routes: Routes = [
    { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
    { path: 'usuarios', component: ListaUsuarios },
    { path: 'usuarios/nuevo', component: Formulario },
    { path: 'usuarios/editar/:id', component: Formulario },
    { path: '**', redirectTo: 'usuarios' }
];
