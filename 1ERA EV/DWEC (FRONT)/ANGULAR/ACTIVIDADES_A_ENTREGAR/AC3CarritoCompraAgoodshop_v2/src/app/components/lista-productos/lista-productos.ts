import { Component, inject, OnInit } from '@angular/core';
import { ProductoCard } from '../producto-card/producto-card';
import { IProducto } from '../../interfaces/iproducto.interfaces';
import { FetchService } from '../../services/fetch-service';
import { CartService } from '../../services/cart-service';

@Component({
  imports: [ProductoCard],
  selector: 'app-lista-productos',
  standalone: true,
  styleUrl: './lista-productos.css',
  templateUrl: './lista-productos.html'
})
export class ListaProductos implements OnInit {
  listaProductos: IProducto[] = [];

  fetchService = inject(FetchService);
  cartService = inject(CartService);

  async ngOnInit(): Promise<void> {
    this.listaProductos = await this.fetchService.getProductos();
  }

  anadirProducto(producto: IProducto): void {
    this.cartService.addProduct(producto);
  }

  cambiarUnidades(producto: IProducto, unidades: number): void {
    this.cartService.actualizarUnidades(producto, unidades);
  }
}
