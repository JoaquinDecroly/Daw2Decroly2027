import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserManager } from '../../services/user-manager';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-lista-usuarios',
  styleUrl: './lista-usuarios.css',
  templateUrl: './lista-usuarios.html',
})
export class ListaUsuarios {
  userManager = inject(UserManager);

  busqueda = '';
  rolSeleccionado = '';
  estadoSeleccionado = '';

  get usuariosFiltrados() {
    const texto = this.busqueda.trim().toLowerCase();

    return this.userManager.usuarios.filter((usuario) => {
      const coincideTexto = !texto
        || usuario.nombre.toLowerCase().includes(texto)
        || usuario.email.toLowerCase().includes(texto);
      const coincideRol = !this.rolSeleccionado
        || usuario.rol === this.rolSeleccionado;
      const coincideEstado = !this.estadoSeleccionado
        || usuario.estado === this.estadoSeleccionado;

      return coincideTexto && coincideRol && coincideEstado;
    });
  }

  eliminarUsuario(id: number): void {
    if (window.confirm('¿Seguro que quieres eliminar este usuario?')) {
      this.userManager.eliminarUsuario(id);
    }
  }
}
