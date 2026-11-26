import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuario-service';
import { FormsModule, NgForm } from '@angular/forms';
import { IUsuario } from '../../interfaces/iusuario.interfaces';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-formulario-usuarios',
  styleUrl: './formulario-usuarios.css',
  templateUrl: './formulario-usuarios.html',
})

export class FormularioUsuarios implements OnInit{
  private usuario: IUsuario | null = null;
  
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  private route = inject(ActivatedRoute);

  modoEdicion: boolean = false;


  nombre: string = "";
  email: string = "";

  rol: string = "";
  departamento: string = "";
  estado: string = "";
  fechaCreacion: string = "";

  usuarioSeleccionado: number = Number(this.route.snapshot.paramMap.get("id"));


  guardarUsuario(formulario: NgForm) {

  if (!formulario.valid) {
    return;
  }

  if(this.modoEdicion){
    if (this.modoEdicion && this.usuario) {

      const usuarioActualizado: IUsuario = {
        id: this.usuario.id,
        nombre: this.nombre,
        email: this.email,
        rol: this.rol,
        departamento: this.departamento,
        estado: this.estado,
        fechaCreacion: this.usuario.fechaCreacion
      };

      this.usuariosService.actualizarUsuario(usuarioActualizado);

}

  }else{
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
  }

  this.router.navigate(['/usuarios']);
}

editarUsuario() {
  if(!this.usuarioSeleccionado){
    return;
  }

  const usuario = this.usuariosService.usuarios.find(
    (p) => p.id === this.usuarioSeleccionado
  );

  if (usuario) {
    this.modoEdicion = true;

    this.usuario = usuario;

    this.nombre = usuario.nombre;
    this.email = usuario.email;
    this.rol = usuario.rol;
    this.departamento = usuario.departamento;
    this.estado = usuario.estado;
    this.fechaCreacion = usuario.fechaCreacion;
  }
}


  ngOnInit(): void {
    this.editarUsuario();
  }
}

