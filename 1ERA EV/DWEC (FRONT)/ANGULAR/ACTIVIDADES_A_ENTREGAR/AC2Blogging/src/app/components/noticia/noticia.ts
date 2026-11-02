import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Noticia as NoticiaModel } from '../../interfaces/noticia.interfaces';

@Component({
  imports: [],
  selector: 'app-noticia',
  styleUrl: './noticia.css',
  templateUrl: './noticia.html',
})
export class Noticia {

  @Input() noticia: NoticiaModel = {
    titulo: '',
    imagen: '',
    texto: '',
    fecha: '',
  };

  @Output() eliminar = new EventEmitter<NoticiaModel>();

  @Output() editar = new EventEmitter<void>();

  borrar():void{
    this.eliminar.emit(this.noticia);
  }

  editarNoticia(): void {
  this.editar.emit();
}
}
