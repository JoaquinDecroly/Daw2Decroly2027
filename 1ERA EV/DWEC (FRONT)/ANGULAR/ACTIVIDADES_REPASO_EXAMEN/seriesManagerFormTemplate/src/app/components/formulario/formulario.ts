import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ISerie } from '../../interfaces/iserie.interfaces';
import { SeriesService } from '../../services/series-service';

@Component({
  imports: [FormsModule],
  selector: 'app-formulario',
  styleUrl: './formulario.css',
  templateUrl: './formulario.html',
})
export class Formulario {
  seriesService = inject(SeriesService);
  
  @Input() serieEditar: ISerie | null = null;

  serie: ISerie = {
  id: 0,
  name: '',
  language: '',
  genres: [],
  status: '',
  premiered: null,
  summary: '',
  image: null
};

imagen: string = '';
modoEdicion: boolean = false;


//   getData() {

//   const nuevaSerie: ISerie = {
//     ...this.serie,
//     id: this.modoEdicion ? this.serie.id : Date.now(),
//     image: this.imagen ? {
//       medium: this.imagen,
//       original: this.imagen
//     } : null
//   };

//   if (this.modoEdicion) {
//     this.seriesService.editarSerie(nuevaSerie);
//   } else {
//     this.seriesService.guardarSerie(nuevaSerie);
//   }

//   this.serie = {
//     id: 0,
//     name: '',
//     language: '',
//     genres: [],
//     status: '',
//     premiered: null,
//     summary: '',
//     image: null
//   };

//   this.imagen = '';
//   this.modoEdicion = false;
// }

// getData(formulario: NgForm) {

//   if (!formulario.valid) {
//     return;
//   }

//   const serieGuardada: ISerie = {
//     ...this.serie,
//     id: this.modoEdicion ? this.serie.id : Date.now(),
//     image: this.imagen ? {
//       medium: this.imagen,
//       original: this.imagen
//     } : null
//   };

//   if (this.modoEdicion) {
//     this.seriesService.editarSerie(serieGuardada);
//   } else {
//     this.seriesService.guardarSerie(serieGuardada);
//   }

//   // Limpiar formulario
//   this.serie = {
//     id: 0,
//     name: '',
//     language: '',
//     genres: [],
//     status: '',
//     premiered: null,
//     summary: '',
//     image: null
//   };

//   this.imagen = '';
//   this.modoEdicion = false;

//   formulario.resetForm();
// }

getData(formulario: NgForm) {

  if (!formulario.valid) {
    return;
  }

console.log('Modo edición:', this.modoEdicion);
console.log('ID de la serie:', this.serieEditar?.id);
console.log('Serie que voy a guardar:', this.serieEditar);

  if(this.modoEdicion){
    if (this.modoEdicion && this.serie) {

      const serieActualizada: ISerie = {
        id: this.serie.id,
        name: this.serie.name,
        language: this.serie.language,
        genres: this.serie.genres,
        image: this.serie.image,
        premiered: this.serie.premiered,
        summary: this.serie.summary,
        status: this.serie.status
      };

      this.seriesService.editarSerie(serieActualizada);

}

  }else{
  const nuevaSerie: ISerie = {
        id: this.serie.id,
        name: this.serie.name,
        language: this.serie.language,
        genres: this.serie.genres,
        image: this.serie.image,
        premiered: this.serie.premiered,
        summary: this.serie.summary,
        status: this.serie.status
  };

  this.seriesService.guardarSerie(nuevaSerie);
  }
}

editarUsuario() {
  if(!this.serie){
    return;
  }

  const serieA = this.seriesService.listaSeries.find(
    (p) => p.id === this.serie?.id
  );

  if (serieA) {
    this.modoEdicion = true;

    this.serie = serieA;

    this.serie.name = serieA.name;
    this.serie.language = serieA.language;
    this.serie.genres = serieA.genres;
    this.serie.image = serieA.image;
    this.serie.premiered = serieA.premiered;
    this.serie.summary = serieA.summary;
    this.serie.status = serieA.status
  }
}

  ngOnChanges() {
  if (this.serieEditar) {
    this.modoEdicion = true;
    this.serie = { ...this.serieEditar };
    this.imagen = this.serieEditar.image?.medium ?? '';
  }
}

}
