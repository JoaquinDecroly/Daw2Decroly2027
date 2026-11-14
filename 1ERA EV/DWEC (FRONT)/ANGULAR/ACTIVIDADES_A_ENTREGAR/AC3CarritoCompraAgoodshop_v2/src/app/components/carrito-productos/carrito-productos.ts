import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { IProducto } from '../../interfaces/iproducto.interfaces';
import { CartService } from '../../services/cart-service';

@Component({
  imports: [DecimalPipe],
  selector: 'app-carrito-productos',
  standalone: true,
  styleUrl: './carrito-productos.css',
  templateUrl: './carrito-productos.html'
})
export class CarritoProductos {
  moneda: string = '€';
  carrito = inject(CartService);

  productosEnCarrito(): IProducto[] {
    return this.carrito.cartProductos;
  }

  subtotal(producto: IProducto): number {
    return (producto.precio ?? 0) * producto.unidades;
  }

  total(): number {
    return this.productosEnCarrito().reduce(
      (totalAcumulado, producto) =>
        totalAcumulado + this.subtotal(producto),
      0
    );
  }
}
