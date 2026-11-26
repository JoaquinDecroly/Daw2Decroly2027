import { Injectable, Service } from '@angular/core';
import { IUsuario } from '../interfaces/iusuario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuarios: IUsuario[] = [
      {
      id: 1,
      nombre: 'Carlos García',
      email: 'carlos@gmail.com',
      rol: 'Administrador',
      departamento: 'IT',
      estado: 'Activo',
      fechaCreacion: '2024-01-01'
    },
    {
      id: 2,
      nombre: 'Laura Martínez',
      email: 'laura@gmail.com',
      rol: 'Editor',
      departamento: 'Marketing',
      estado: 'Activo',
      fechaCreacion: '2024-01-02'
    },
    {
      id: 3,
      nombre: 'David López',
      email: 'david@gmail.com',
    
      rol: 'Usuario',
      departamento: 'Soporte',
      estado: 'Inactivo',
      fechaCreacion: '2024-03-08'
    },
    {
      id: 4,
      nombre: 'María Sánchez',
      email: 'maria@gmail.com',
      rol: 'Administrador',
      departamento: 'Recursos Humanos',
      estado: 'Activo',
      fechaCreacion: '2024-02-15'
    },
    {
      id: 5,
      nombre: 'Pablo Fernández',
      email: 'pablo@gmail.com',
      rol: 'Editor',
      departamento: 'Diseño',
      estado: 'Activo',
      fechaCreacion: '2024-04-10'
    }
  ];

    agregarUsuario(usuario: IUsuario) {
        this.usuarios.push(usuario);
    }

    actualizarUsuario(usuarioActualizado: IUsuario){
      const index = this.usuarios.findIndex((p) => 
        p.id === usuarioActualizado.id
      )

      if(index != (-1)){
        this.usuarios.splice(index, 1, usuarioActualizado);
      }
    }
}
