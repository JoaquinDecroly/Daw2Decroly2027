import { Component, Input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IProducto } from './interfaces/iproducto.interfaces';
import { Catalogo } from './components/catalogo/catalogo';
import { Carrito } from './components/carrito/carrito';

@Component({
  imports: [Catalogo, Carrito],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  protected readonly title = signal('pruebaCarrito');

  productos:IProducto[];
  carrito: IProducto[] = [];

  constructor(){
    this.productos = [
      {
        id: 1,
        nombre: 'Portátil ASUS VivoBook',
        precio: 799,
        imagen: 'assets/img/portatil-asus.png',
        categoria: 'Ordenadores portátiles'
      },
      {
        id: 2,
        nombre: 'MacBook Air M3',
        precio: 1199,
        imagen: 'assets/img/macbook-air.png',
        categoria: 'Ordenadores portátiles'
      },
      {
        id: 3,
        nombre: 'Samsung Galaxy S24',
        precio: 699,
        imagen: 'assets/img/samsung-s24.png',
        categoria: 'Smartphones'
      },
      {
        id: 4,
        nombre: 'iPhone 15',
        precio: 899,
        imagen: 'assets/img/iphone-15.png',
        categoria: 'Smartphones'
      },
      {
        id: 5,
        nombre: 'Auriculares Sony WH-1000XM5',
        precio: 299,
        imagen: 'assets/img/auriculares-sony.png',
        categoria: 'Accesorios'
      },
      {
        id: 6,
        nombre: 'Ratón Logitech MX Master 3S',
        precio: 109,
        imagen: 'assets/img/raton-logitech.png',
        categoria: 'Accesorios'
      }
    ];
  }

  anadirAlCarrito(producto: IProducto) {
    this.carrito = [...this.carrito, producto];
  }

  eliminarDelCarrito(producto: IProducto) {
  const indice = this.carrito.findIndex(p => p.id === producto.id);

  if (indice !== -1) {
    this.carrito.splice(indice, 1);
  }
}


}
