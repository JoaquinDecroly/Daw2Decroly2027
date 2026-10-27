import { Component, Input } from '@angular/core';
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
}
