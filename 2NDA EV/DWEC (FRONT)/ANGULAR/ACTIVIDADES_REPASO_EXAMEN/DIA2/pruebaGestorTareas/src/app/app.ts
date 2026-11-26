import { Component, EventEmitter, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Itarea } from './interfaces/itarea.interfaces';
import { TareaCard } from './components/tarea-card/tarea-card';
import { FormularioTarea } from './components/formulario-tarea/formulario-tarea';

@Component({
  imports: [TareaCard, FormularioTarea],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  protected readonly title = signal('pruebaGestorTareas');

  tareas: Itarea[];

  tareaSeleccionada: Itarea | null = null;

 

  constructor(){
    this.tareas = [
  {
    id: 1,
    titulo: 'Estudiar Angular',
    descripcion: 'Repasar el funcionamiento de los componentes',
    completada: false,
    estado: 'Done'
  },
  {
    id: 2,
    titulo: 'Practicar TypeScript',
    descripcion: 'Trabajar con interfaces y arrays',
    completada: true,
    estado: 'To Do'
  },
  {
    id: 3,
    titulo: 'Hacer ejercicios',
    descripcion: 'Practicar eventos y directivas',
    completada: false,
    estado: 'In Progress'
  }
]
  }

  mostrarTareas(){
    return this.tareas;
  }

  crearTarea(nuevaTarea: Itarea){
    if(this.tareas.length === 0){
      nuevaTarea.id = 1;
    }else{
      nuevaTarea.id = this.tareas[this.tareas.length - 1].id + 1;
    }
      
    this.tareas.push(nuevaTarea);
  }

  cambiarEstado($event: Itarea) {
    switch($event.estado){
      case 'To Do':
        $event.estado = 'In Progress';
      break;

      case 'In Progress':
        $event.estado = 'Done';
      break;

      case 'Done':
        $event.estado = 'To Do';
      break;      
    }
  }

  actualizarTarea(tarea: Itarea) {
    this.tareas = this.tareas.map((t) =>
      t.id === tarea.id ? tarea : t
    );
  }

  editarTarea(tarea:Itarea) {
    // this.tareaSeleccionada = this.tareas.filter((tarea) => this.tareas.indexOf)
    this.tareaSeleccionada = {...tarea}; //copia 
  }

  eliminarTareas(tarea:Itarea) {
    this.tareas = this.tareas.filter(
      (t) => t.id !== tarea.id
    );
  }

  guardarFormulario(tarea:Itarea){
    if(this.tareaSeleccionada === null){
      this.crearTarea(tarea);

    }else {
      this.actualizarTarea(tarea);
    }

    this.tareaSeleccionada = null;
  }
  
  cancelarTarea() {
  this.tareaSeleccionada = null;
}

}


