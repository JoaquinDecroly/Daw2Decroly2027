import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProducto } from '../../interfaces/iproducto.interfaces';
import { DecimalPipe } from '@angular/common';

@Component({
  imports: [DecimalPipe],
  selector: 'app-producto-card',
  standalone: true,
  styleUrl: './producto-card.css',
  templateUrl: './producto-card.html'
})
export class ProductoCard {
  @Input() producto!: IProducto;
  @Input() moneda: string = '€';

  @Output() anadir = new EventEmitter<IProducto>();
  @Output() cambioUnidades =
    new EventEmitter<{ producto: IProducto; unidades: number }>();

  cambiarUnidades(event: Event): void {
    const cantidad = Number((event.target as HTMLInputElement).value);

    this.cambioUnidades.emit({
      producto: this.producto,
      unidades: Number.isInteger(cantidad) ? cantidad : 0
    });
  }

  anadirProducto(): void {
    this.anadir.emit(this.producto);
  }

  sumarUnidad(): void {
    this.cambioUnidades.emit({
      producto: this.producto,
      unidades: this.producto.unidades + 1
    });
  }

  restarUnidad(): void {
    this.cambioUnidades.emit({
      producto: this.producto,
      unidades: this.producto.unidades - 1
    });
  }
}
