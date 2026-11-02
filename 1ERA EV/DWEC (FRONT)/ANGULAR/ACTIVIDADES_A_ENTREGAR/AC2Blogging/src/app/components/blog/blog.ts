import { Component } from '@angular/core';
import { Noticia as NoticiaComponent } from '../noticia/noticia';
import { Noticia } from '../../interfaces/noticia.interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [NoticiaComponent, FormsModule],
  selector: 'app-blog',
  styleUrl: './blog.css',
  templateUrl: './blog.html',
})
export class Blog {

  noticia: Noticia; //objeto noticia de la interfaz Noticia

  arrayNoticia:Noticia[]; //array de noticias (compuesto por objetos Noticia(interfaz))

  mostrarError:boolean;

  constructor(){
    this.noticia = { //declaración valores interfaz Noticia
      titulo: "",
      imagen: "",
      texto: "",
      fecha: ""
    }

    this.arrayNoticia = []; //inicialización array noticias

    this.mostrarError = false;
  }
  
  addNoticia():void{
    let titulo = this.noticia.titulo.trim();
    let texto = this.noticia.texto.trim();

    let urlValida = false;

    try {
      const url = new URL(this.noticia.imagen);
      urlValida = url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      urlValida = false;
    }

    if(!titulo || !texto || !urlValida || !this.noticia.fecha){
      this.mostrarError = true;
      return;
    }

    const nueva = { ...this.noticia, titulo, texto };

    if (this.indiceEditando !== null) {
      this.arrayNoticia[this.indiceEditando] = nueva; // reemplaza
      this.indiceEditando = null;
    } else {
      this.arrayNoticia.push(nueva); // añade
    }

    this.mostrarError = false;

    this.noticia = { //declaración valores interfaz Noticia
      titulo: "",
      imagen: "",
      texto: "",
      fecha: ""
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

  eliminarNoticia(i: number) {
    this.arrayNoticia.splice(i, 1);
  }

  indiceEditando: number | null = null;

  cargarParaEditar(i: number): void {
    this.noticia = { ...this.arrayNoticia[i] }; //copia
    this.indiceEditando = i;
  }

}