import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { productService } from '../../services/productService';
import { CartaProducto } from '../carta-producto/carta-producto';
import { fetchProducts } from '../../services/fetchProducts';

@Component({
  imports: [CartaProducto],
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-lista-productos',
  styleUrl: './lista-productos.css',
  templateUrl: './lista-productos.html',
})
export class ListaProductos {
  productService = inject(productService);
  fetchService = inject(fetchProducts);


  eliminarProduct($event:string){
    this.productService.eliminarProduct($event);
  }

  filtrarProductByNombre($event:string){
    this.productService.filtrarNombre($event);
  }

  filtrarProductByCategoria($event:string){
    this.productService.filtrarCategoria($event);
  }

  filtrarProductoByPrecio($event:number){
    this.productService.filtrarPrecio($event);
  }

  filtrarProductoByActividad($event:boolean){
    this.productService.filtrarActivo($event);
  }


  ngOnInit(){
    this.fetchService.getProducts().then((product) => {
      console.log('Series recibidas:', product);
    console.log('Lista del servicio:', this.productService.listaProductos);
    })
  }
}
