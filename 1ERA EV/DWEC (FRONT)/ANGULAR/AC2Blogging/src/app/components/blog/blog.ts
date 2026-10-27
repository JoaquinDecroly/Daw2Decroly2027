import { Component } from '@angular/core';
import { Noticia as NoticiaComponent } from '../noticia/noticia';
import { Noticia } from '../../interfaces/noticia.interfaces';

@Component({
  imports: [NoticiaComponent],
  selector: 'app-blog',
  styleUrl: './blog.css',
  templateUrl: './blog.html',
})
export class Blog {
  noticia: Noticia; //objeto noticia de la interfaz Noticia

  arrayNoticia:Noticia[]; //array de noticias (compuesto por objetos Noticia(interfaz))

  valido:boolean;

  constructor(){
    this.noticia = { //declaración valores interfaz Noticia
      titulo: "",
      imagen: "",
      texto: "",
      fecha: ""
    }

    this.arrayNoticia = []; //inicialización array noticias

    this.valido = false;
  }
  
  addNoticia():void{
    if(this.noticia.titulo && this.noticia.imagen && this.noticia.texto && this.noticia.fecha){
    this.arrayNoticia.push(this.noticia);
  
    this.noticia = { //volver a valores predeterminados por problema al añadir, y memoria caché
      titulo: "",
      imagen: "",
      texto: "",
      fecha: ""
    }
    }
  }

  //-------VALIDADORES-------
  validarTexto($event: InputEvent): boolean {
    const campo = $event.target;
    return campo instanceof HTMLTextAreaElement && campo.value.trim().length > 0;
  }

  validarFecha($event: InputEvent): boolean {
    const campo = $event.target;
    return campo instanceof HTMLInputElement
      && campo.type === 'date'
      && campo.value !== ''
      && campo.validity.valid;
  }

  validarURL($event: InputEvent): boolean {
    const campo = $event.target;
    if (!(campo instanceof HTMLInputElement) || campo.type !== 'url' || campo.value.trim() === '' || !campo.validity.valid) {
      return false;
    }

    try {
      const url = new URL(campo.value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  validarTitulo($event: InputEvent): boolean {
    const campo = $event.target;
    return campo instanceof HTMLInputElement
      && campo.type === 'text'
      && campo.value.trim().length > 0;
  }

}