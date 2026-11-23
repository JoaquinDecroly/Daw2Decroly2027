import { Routes } from '@angular/router';
import { PaginaNoEncontrada } from './pages/pagina-no-encontrada/pagina-no-encontrada';
import { Formulario } from './components/formulario/formulario';
import { Juegos } from './pages/juegos/juegos';
import { Favoritos } from './pages/favoritos/favoritos';
import { Inicio } from './pages/inicio/inicio';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: Inicio},
    { path: 'juegos', component: Juegos },
    { path: 'juegos/crear', component: Formulario },
    { path: 'juegos/editar/:id', component: Formulario },
    { path: 'favoritos', component: Favoritos},
    { path: '**', component: PaginaNoEncontrada }
];
