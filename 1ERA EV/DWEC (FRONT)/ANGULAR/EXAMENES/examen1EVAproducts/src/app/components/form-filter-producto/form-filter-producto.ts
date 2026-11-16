import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { productService } from '../../services/productService';
import { IProducto } from '../../interfaces/iproducto.interfaces';

@Component({
  imports: [FormsModule],
  selector: 'app-form-filter-producto',
  styleUrl: './form-filter-producto.css',
  templateUrl: './form-filter-producto.html',
})
export class FormFilterProducto {
  ProductService = inject(productService);

  product!: IProducto;
  

   getData(miFormulario: NgForm): void {
        let producto: IProducto = miFormulario.value as IProducto;

        this.ProductService.añadirProduct(producto);
        miFormulario.reset();
    }
}
