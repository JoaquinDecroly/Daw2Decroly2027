import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProducto } from '../../interfaces/iproducto.interfaces';

@Component({
  imports: [],
  selector: 'app-carrito',
  styleUrl: './carrito.css',
  templateUrl: './carrito.html',
})
export class Carrito {
  @Input() productosCarrito: IProducto[] = [];
  @Output() eliminar = new EventEmitter<IProducto>();

  subtotal: number = 0;

  eliminarProductoCarrito(producto: IProducto){
    this.eliminar.emit(producto);
  }

  calcularTotal(): number{
    this.subtotal = 0;

    this.productosCarrito.forEach((p) =>{
    this.subtotal += p.precio;
    });
    
    return this.subtotal;
  }
  
  
  
  
}
