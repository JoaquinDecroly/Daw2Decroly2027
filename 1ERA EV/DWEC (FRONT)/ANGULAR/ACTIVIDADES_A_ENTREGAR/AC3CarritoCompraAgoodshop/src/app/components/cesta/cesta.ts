import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';
import { inject } from '@angular/core';
import { Producto } from '../producto/producto';

@Component({
  selector: 'app-cesta',
  styleUrl: './cesta.css',
  templateUrl: './cesta.html',
    imports: [FormsModule, Producto]
})
export class Cesta implements OnInit {
  private readonly productosService = inject(ProductosService);
  readonly carrito = inject(CarritoService);
  readonly moneda = signal('€');

  async ngOnInit(): Promise<void> {
    try {
      const catalogo = await this.productosService.cargarProductos();
      this.carrito.cargarProductos(catalogo.productos);
      this.moneda.set(catalogo.moneda);
    } catch (error) {
      console.error('Error al cargar productos', error);
    }
  }
}
