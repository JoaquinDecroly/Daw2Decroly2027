import { Component, inject, Input, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { IUsuario } from './interfaces/iusuario.interfaces';
import { UsuariosService } from './services/usuario-service';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('pruebaUserManager');

  private usuarios = inject(UsuariosService);

  constructor(){
    
  }










}
