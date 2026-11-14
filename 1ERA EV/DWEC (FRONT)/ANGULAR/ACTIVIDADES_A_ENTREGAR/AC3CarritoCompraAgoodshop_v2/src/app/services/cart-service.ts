import { Service } from '@angular/core';
import { IProducto } from '../interfaces/iproducto.interfaces';

@Service()
export class CartService {
  cartProductos: IProducto[] = [];

  addProduct(producto: IProducto): void {
    const productoExistente = this.cartProductos.find(
      p => p.id === producto.id
    );

    if (productoExistente) {
      if (productoExistente.unidades < 99) {
        productoExistente.unidades++;
      }
    } else {
      producto.unidades = 1;
      producto.enCarrito = true;
      this.cartProductos.push(producto);
    }
  }

  actualizarUnidades(producto: IProducto, unidades: number): void {
    const productoExistente = this.cartProductos.find(
      p => p.id === producto.id
    );

    if (!productoExistente) {
      if (unidades > 0) {
        this.addProduct(producto);
        this.actualizarUnidades(producto, unidades);
      }
      return;
    }

    if (!Number.isInteger(unidades) || unidades <= 0) {
      this.deleteProduct(producto);
      return;
    }

    productoExistente.unidades = Math.min(unidades, 99);
  }

  deleteProduct(producto: IProducto): void {
    const index = this.cartProductos.findIndex(
      p => p.id === producto.id
    );

    if (index !== -1) {
      const productoEliminado = this.cartProductos[index];
      productoEliminado.unidades = 0;
      productoEliminado.enCarrito = false;
      this.cartProductos.splice(index, 1);
    }
  }
}
