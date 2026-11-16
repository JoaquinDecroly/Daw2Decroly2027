import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormProducto } from './components/form-producto/form-producto';
import { ListaProductos } from './components/lista-productos/lista-productos';
import { FormFilterProducto } from './components/form-filter-producto/form-filter-producto';

@Component({
  imports: [FormProducto, ListaProductos, FormFilterProducto],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  protected readonly title = signal('examen1EVAproducts');
}
