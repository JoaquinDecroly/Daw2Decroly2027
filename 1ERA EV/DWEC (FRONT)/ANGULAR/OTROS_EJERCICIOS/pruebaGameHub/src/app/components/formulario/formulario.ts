import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JuegoManager } from '../../services/juego-manager';
import { IJuego } from '../../interfaces/ijuego.interfaces';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-formulario',
  styleUrl: './formulario.css',
  templateUrl: './formulario.html',
})
export class Formulario {
  private route = inject(ActivatedRoute);

  private juegosManager = inject(JuegoManager);

  juegoEditar: IJuego | null = null;

  private router = inject(Router);

  modoEdicion: boolean = false;

  juegoSeleccionado: number = Number(this.route.snapshot.paramMap.get("id"));


  nombre: string = "";
  plataforma:string = "";
  genero:string = "";
  precio:number = 0;
  imagen:string = "";
  descripcion:string = "";
  favorito:boolean = false;


  guardarJuego(formulario: NgForm) {

  if (!formulario.valid) {
    return;
  }

  if(this.modoEdicion){
    if (this.juegoEditar) {

      const juegoActualizado: IJuego = {
        id: this.juegoEditar.id,
        nombre: this.nombre,
        plataforma: this.plataforma,
        genero: this.genero,
        precio: this.precio,
        imagen: this.imagen,
        descripcion: this.descripcion,
        favorito: this.favorito
      };

      this.juegosManager.guardarJuego(juegoActualizado);

}

  }else{
  const nuevoJuego: IJuego = {
        id: this.juegosManager.juegos.length + 1,
        nombre: this.nombre,
        plataforma: this.plataforma,
        genero: this.genero,
        precio: this.precio,
        imagen: this.imagen,
        descripcion: this.descripcion,
        favorito: this.favorito
  };

  this.juegosManager.guardarJuego(nuevoJuego);
  }

  this.router.navigate(['/juegos']);
}


editarJuego() {
  if(!this.juegoSeleccionado){
    return;
  }

  const juego = this.juegosManager.juegos.find(
    (j) => j.id === this.juegoSeleccionado
  );

  if (juego) {
    this.modoEdicion = true;

    this.juegoEditar = juego;

    this.nombre = juego.nombre;
    this.plataforma = juego.plataforma;
    this.genero = juego.genero;
    this.precio = juego.precio;
    this.imagen = juego.imagen;
    this.descripcion = juego.descripcion;
    this.favorito = juego.favorito;
  }
}


  ngOnInit(): void {
    this.editarJuego();
  }


  
}
