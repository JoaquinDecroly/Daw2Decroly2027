import { Injectable, computed, signal } from '@angular/core';
import { IProducto } from '../interfaces/Iproducto.interfaces';

export type IProductoEnCarrito = IProducto & {
  precio: number;
  subtotal: number;
};

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  readonly productos = signal<IProducto[]>([]);

  readonly productosEnCarrito = computed<IProductoEnCarrito[]>(() =>
    this.productos()
      .filter(
        (producto): producto is IProducto & { precio: number } =>
          producto.unidades > 0 && producto.precio !== null,
      )
      .map((producto) => ({
        ...producto,
        subtotal: producto.precio * producto.unidades,
      })),
  );

  readonly total = computed(() =>
    this.productosEnCarrito().reduce((suma, producto) => suma + producto.subtotal, 0),
  );

  cargarProductos(productos: IProducto[]): void {
    this.productos.set(productos.map((producto) => ({ ...producto, unidades: 0 })));
  }

  obtenerProducto(id: number): IProducto {
    const producto = this.productos().find((item) => item.id === id);
    if (!producto) {
      throw new RangeError(`No existe un producto con identificador: ${id}`);
    }
    return producto;
  }

  actualizarUnidades(id: number, unidades: number): void {
    const producto = this.obtenerProducto(id);
    if (!Number.isFinite(unidades)) {
      throw new TypeError('La cantidad debe ser un número finito.');
    }
    if (producto.precio === null && unidades > 0) {
      throw new RangeError(`El producto ${producto.nombre} no tiene un precio válido.`);
    }

    const cantidad = Math.max(0, Math.min(99, Math.trunc(unidades)));
    this.productos.update((productos) =>
      productos.map((item) => (item.id === id ? { ...item, unidades: cantidad } : item)),
    );
  }
}
