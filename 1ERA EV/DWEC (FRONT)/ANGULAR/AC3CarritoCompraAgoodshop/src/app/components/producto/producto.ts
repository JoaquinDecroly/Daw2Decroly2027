import { Component, input, output } from '@angular/core';
import { IProducto } from '../../interfaces/Iproducto.interfaces';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.html',
  styleUrl: './producto.css',
    imports: []
})
export class Producto {
  readonly producto = input.required<IProducto>();
  readonly moneda = input('€');
  readonly cambioUnidades = output<number>();

  cambiarUnidades(event: Event): void {
    const cantidad = Number((event.target as HTMLInputElement).value);
    this.cambioUnidades.emit(Number.isInteger(cantidad) ? cantidad : 0);
  }
}
