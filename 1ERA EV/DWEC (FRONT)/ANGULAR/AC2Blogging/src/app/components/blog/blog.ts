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

  constructor(){
    this.noticia = { //declaración valores interfaz Noticia
      titulo: "",
      imagen: "",
      texto: "",
      fecha: ""
    }

    this.arrayNoticia = []; //inicialización array noticias
  }
  
  addNoticia(){
        
  }

}