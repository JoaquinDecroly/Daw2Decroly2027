import { Routes } from '@angular/router';
import { ListadoUsuarios } from './components/listado-usuarios/listado-usuarios';
import { FormularioUsuarios } from './components/formulario-usuarios/formulario-usuarios';

export const routes: Routes = [
       { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
   { path: 'usuarios', component: ListadoUsuarios },
   { path: 'usuarios/nuevo', component: FormularioUsuarios },
];
