import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProducto } from '../../interfaces/iproducto.interfaces';

@Component({
  imports: [],
  selector: 'app-carta-producto',
  styleUrl: './carta-producto.css',
  templateUrl: './carta-producto.html',
})
export class CartaProducto {
  @Input() product !: IProducto;

  @Output() eliminar = new EventEmitter<IProducto>();

  @Output() filtrarNombre = new EventEmitter<IProducto>();

  @Output() filtrarCategoria = new EventEmitter<IProducto>();

  @Output() filtrarPrecio = new EventEmitter<IProducto>();

  @Output() filtrarActivo = new EventEmitter<IProducto>();




  eliminarProduct(){
    this.eliminar.emit(this.product);
  }

  filtrarPorNombre(){
    this.filtrarNombre.emit(this.product);
  }

  filtrarPorCategoria(){
    this.filtrarCategoria.emit(this.product);
  }

  filtrarPorPrecio(){
    this.filtrarPrecio.emit(this.product);
  }

  filtrarPorActivo(){
    this.filtrarActivo.emit(this.product);
  }
}
