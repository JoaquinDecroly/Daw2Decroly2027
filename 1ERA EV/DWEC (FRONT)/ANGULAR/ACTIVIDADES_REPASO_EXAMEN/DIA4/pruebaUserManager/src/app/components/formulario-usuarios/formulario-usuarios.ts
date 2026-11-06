import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuario-service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { IUsuario } from '../../interfaces/iusuario.interfaces';
import { LocalizedString } from '@angular/compiler';

@Component({
  imports: [RouterLink, FormsModule, NgIf],
  selector: 'app-formulario-usuarios',
  styleUrl: './formulario-usuarios.css',
  templateUrl: './formulario-usuarios.html',
})
export class FormularioUsuarios {

  private usuario: IUsuario | null = null;
  
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  nombre: string = "";
  email: string = "";

  rol: string = "";
  departamento: string = "";
  estado: string = "";
  fechaCreacion: string = "";


  guardarUsuario(formulario: NgForm) {

  if (!formulario.valid) {
    return;
  }

  const nuevoUsuario: IUsuario = {
    id: this.usuariosService.usuarios.length + 1,
    nombre: this.nombre,
    email: this.email,
    rol: this.rol,
    departamento: this.departamento,
    estado: this.estado,
    fechaCreacion: new Date().toISOString().split('T')[0]
  };

  this.usuariosService.agregarUsuario(nuevoUsuario);

  this.router.navigate(['/usuarios']);
}
}

