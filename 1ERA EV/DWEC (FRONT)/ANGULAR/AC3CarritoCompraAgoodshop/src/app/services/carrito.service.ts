import { Injectable, computed, signal } from '@angular/core';
import { IProducto } from '../interfaces/iproducto.interfaces';

export type IProductoEnCarrito = IProducto & {
  precio: number;
  subtotal: number;
};

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  readonly productos = signal<IProducto[]>([]);

  // El carrito solo muestra productos con unidades y precio válido; también calcula cada subtotal.
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

  // El total se recalcula automáticamente cuando cambia algún producto del carrito.
  readonly total = computed(() =>
    this.productosEnCarrito().reduce((suma, producto) => suma + producto.subtotal, 0),
  );

  cargarProductos(productos: IProducto[]): void {
    // Al cargar un catálogo nuevo, todas las cantidades empiezan en cero.
    this.productos.set(productos.map((producto) => ({ ...producto, unidades: 0 })));
  }

  obtenerProducto(id: number): IProducto {
    const producto = this.productos().find((item) => item.id === id);
    // Evita actualizar silenciosamente un identificador que no pertenece al catálogo.
    if (!producto) {
      throw new RangeError(`No existe un producto con identificador: ${id}`);
    }
    return producto;
  }

  actualizarUnidades(id: number, unidades: number): void {
    const producto = this.obtenerProducto(id);
    // Rechaza cantidades inválidas y evita añadir productos cuyo precio no se pudo leer.
    if (!Number.isFinite(unidades)) {
      throw new TypeError('La cantidad debe ser un número finito.');
    }
    if (producto.precio === null && unidades > 0) {
      throw new RangeError(`El producto ${producto.nombre} no tiene un precio válido.`);
    }

    // Limita la cantidad al rango permitido y actualiza la señal de forma inmutable.
    const cantidad = Math.max(0, Math.min(99, Math.trunc(unidades)));
    this.productos.update((productos) =>
      productos.map((item) => (item.id === id ? { ...item, unidades: cantidad } : item)),
    );
  }
}
