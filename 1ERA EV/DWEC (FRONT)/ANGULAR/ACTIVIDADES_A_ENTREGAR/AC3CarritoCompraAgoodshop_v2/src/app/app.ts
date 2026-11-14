import { Component } from '@angular/core';
import { ListaProductos } from './components/lista-productos/lista-productos';
import { CarritoProductos } from './components/carrito-productos/carrito-productos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaProductos, CarritoProductos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
