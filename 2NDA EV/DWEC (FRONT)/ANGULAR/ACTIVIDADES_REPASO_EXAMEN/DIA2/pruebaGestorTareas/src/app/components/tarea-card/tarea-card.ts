import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Itarea } from '../../interfaces/itarea.interfaces';

@Component({
  imports: [],
  selector: 'app-tarea-card',
  styleUrl: './tarea-card.css',
  templateUrl: './tarea-card.html',
})
export class TareaCard {
  @Input() tarea!: Itarea;

  @Output() editar = new EventEmitter<Itarea>();
  @Output() eliminar = new EventEmitter<Itarea>();
  @Output() cambioEstado = new EventEmitter<Itarea>();

  editarTarea(){
    this.editar.emit(this.tarea);
  }

  eliminarTarea(){
    this.eliminar.emit(this.tarea);
  }

  cambiarEstado(){
    this.cambioEstado.emit(this.tarea);
  }

  
}
