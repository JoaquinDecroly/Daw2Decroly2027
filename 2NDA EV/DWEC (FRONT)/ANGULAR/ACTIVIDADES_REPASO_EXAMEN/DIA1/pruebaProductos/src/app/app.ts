import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Iproducto } from './interfaces/iproducto.interfaces';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('pruebaProductos');

  private productosArray:Iproducto[];
  productosVisibles:Iproducto[] = [];


  constructor(){
    this.productosArray = [
      {
        id: 1, nombre: 'Teclado mecánico', precio: 59.99, categoria: 'Periféricos',
        imagen: ''
      },
      {
        id: 2, nombre: 'Ratón gaming', precio: 29.99, categoria: 'Periféricos',
        imagen: ''
      },
      {
        id: 3, nombre: 'Monitor 27 pulgadas', precio: 199.99, categoria: 'Monitores',
        imagen: ''
      },
      {
        id: 4, nombre: 'Monitor 24 pulgadas', precio: 149.99, categoria: 'Monitores',
        imagen: ''
      },
      {
        id: 5, nombre: 'Auriculares inalámbricos', precio: 79.99, categoria: 'Audio',
        imagen: ''
      },
      {
        id: 6, nombre: 'Micrófono USB', precio: 45.99, categoria: 'Audio',
        imagen: ''
      }
];
    this.productosVisibles = [...this.productosArray];
  }

  eliminarProducto(id:number):void{
    this.productosArray = this.productosArray.filter(
      (producto) => producto.id !== id
    );

    this.productosVisibles = this.productosVisibles.filter(
      (producto) => producto.id !== id
    );
  }

  

  filtrarCategoria(categoria:string):void{
    this.productosVisibles = this.productosArray.filter(
      (producto) => producto.categoria === categoria
    );
  }

  filtrarNombre(nombre: string): void {
  this.productosVisibles = this.productosArray.filter(
    (producto) => producto.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
}

  quitarFiltro():void{
    this.productosVisibles = [...this.productosArray];
  }

  }
