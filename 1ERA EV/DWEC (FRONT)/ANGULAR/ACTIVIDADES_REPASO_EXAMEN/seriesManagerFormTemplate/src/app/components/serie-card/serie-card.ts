import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISerie } from '../../interfaces/iserie.interfaces';

@Component({
  imports: [],
  selector: 'app-serie-card',
  styleUrl: './serie-card.css',
  templateUrl: './serie-card.html',
})
export class SerieCard {
  @Input() serie !:ISerie;

  @Output() eliminar = new EventEmitter<number>();

  @Output() editar = new EventEmitter<ISerie>();


  eliminarSerie(){
    this.eliminar.emit(this.serie.id);
  }

  editarSerie(){
    this.editar.emit(this.serie);
  }




}
