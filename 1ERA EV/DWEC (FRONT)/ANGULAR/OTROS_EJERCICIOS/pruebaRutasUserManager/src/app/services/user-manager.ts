import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/iusuario.interfaces';

@Injectable({ providedIn: 'root' })
export class UserManager {
    usuarios: IUsuario[] = [
      {
      id: 1,
      nombre: 'Carlos García',
      email: 'carlos@gmail.com',
      rol: 'Administrador',
      departamento: 'IT',
      estado: 'activo',
      fechaCreacion: '2024-01-01'
    },
    {
      id: 2,
      nombre: 'Laura Martínez',
      email: 'laura@gmail.com',
      rol: 'Editor',
      departamento: 'Marketing',
      estado: 'activo',
      fechaCreacion: '2024-01-02'
    },
    {
      id: 3,
      nombre: 'David López',
      email: 'david@gmail.com',
    
      rol: 'Usuario',
      departamento: 'Soporte',
      estado: 'inactivo',
      fechaCreacion: '2024-03-08'
    },
    {
      id: 4,
      nombre: 'María Sánchez',
      email: 'maria@gmail.com',
      rol: 'Administrador',
      departamento: 'Recursos Humanos',
      estado: 'activo',
      fechaCreacion: '2024-02-15'
    },
    {
      id: 5,
      nombre: 'Pablo Fernández',
      email: 'pablo@gmail.com',
      rol: 'Editor',
      departamento: 'Diseño',
      estado: 'activo',
      fechaCreacion: '2024-04-10'
    }
  ];

  agregarUsuario(user:IUsuario){
    if (user.id === 0) {
      const nuevoUsuario: IUsuario = {
        ...user,
        id: this.obtenerNuevoId(),
        fechaCreacion: new Date().toISOString().slice(0, 10)
      };
      this.usuarios.push(nuevoUsuario);
      return;
    }

    if (this.comprobarUsuario(user.id)){
        this.actualizarUsuario(user);
    }
  }

  obtenerUsuario(id: number): IUsuario | undefined {
    return this.usuarios.find((usuario) => usuario.id === id);
  }

  eliminarUsuario(id: number): void {
    this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
  }

  private obtenerNuevoId(): number {
    return this.usuarios.length
      ? Math.max(...this.usuarios.map((usuario) => usuario.id)) + 1
      : 1;
  }

  actualizarUsuario(user:IUsuario){
    const index = this.usuarios.findIndex((p) =>
    p.id === user.id);

    if(index != (-1)){
        this.usuarios.splice(index, 1, user);
    }
  }

    comprobarUsuario(id: number): boolean {
        return this.usuarios.some((user) =>
        user.id === id
    ); 
  }
}
