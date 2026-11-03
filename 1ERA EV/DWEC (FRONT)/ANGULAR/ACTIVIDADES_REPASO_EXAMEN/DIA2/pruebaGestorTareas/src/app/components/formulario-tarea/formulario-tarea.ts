import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Itarea } from '../../interfaces/itarea.interfaces';

@Component({
  imports: [FormsModule],
  selector: 'app-formulario-tarea',
  styleUrl: './formulario-tarea.css',
  templateUrl: './formulario-tarea.html',
})
export class FormularioTarea implements OnChanges {
  titulo:string;
  descripcion:string;
    estado: 'To Do' | 'In Progress' | 'Done';


    @Input() tareaEditar:Itarea | null = null
    @Output() guardar = new EventEmitter<Itarea>();
     @Output() cancelar = new EventEmitter<void>();

    constructor(){
      this.titulo = "";
      this.descripcion = "";
      this.estado = 'To Do';
    }
 
  
  guardarTarea() {
     const nuevaTarea: Itarea = {
        id: this.tareaEditar ? this.tareaEditar.id : 0,
        titulo: this.titulo,
        descripcion: this.descripcion,
        estado: this.estado
      };

    this.guardar.emit(nuevaTarea);
    
    this.titulo = "";
      this.descripcion = "";
      this.estado = 'To Do';

  }

  editarTarea() {
    this.titulo = this.tareaEditar!.titulo;
    this.descripcion = this.tareaEditar!.descripcion;
    this.estado = this.tareaEditar!.estado;
}

   ngOnChanges(changes: SimpleChanges) {
    if (this.tareaEditar) {
      this.editarTarea();
    }
  }

    cancelarTarea() {
      this.titulo = "";
      this.descripcion = "";
      this.estado = 'To Do';
      this.cancelar.emit();
  }
}
