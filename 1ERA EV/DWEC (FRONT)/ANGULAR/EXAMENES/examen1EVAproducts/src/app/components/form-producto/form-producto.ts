import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IProducto } from '../../interfaces/iproducto.interfaces';
import { productService } from '../../services/productService';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-form-producto',
  styleUrl: './form-producto.css',
  templateUrl: './form-producto.html',
})
export class FormProducto {
  ProductService = inject(productService);
  modelForm:FormGroup;

  constructor(){
    this.modelForm = new FormGroup({
      name: new FormControl(null, []),
      description: new FormControl(null, []),
      image: new FormControl(null, []),
      category: new FormControl(null, []),
      price: new FormControl(null, []),
      active: new FormControl(null, [])
    });
  }

  getData() {
      let product = this.modelForm.value as IProducto;
      
      this.modelForm.reset();
    }


}
