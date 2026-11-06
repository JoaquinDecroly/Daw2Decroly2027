import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUsuario } from '../../interfaces/iusuario.interfaces';
import { UsuariosService } from '../../services/usuario-service';

@Component({
  imports: [RouterLink],
  selector: 'app-listado-usuarios',
  styleUrl: './listado-usuarios.css',
  templateUrl: './listado-usuarios.html',
})
export class ListadoUsuarios {
  private usuariosService = inject(UsuariosService);

  usuariosLista = this.usuariosService.usuarios;


}
