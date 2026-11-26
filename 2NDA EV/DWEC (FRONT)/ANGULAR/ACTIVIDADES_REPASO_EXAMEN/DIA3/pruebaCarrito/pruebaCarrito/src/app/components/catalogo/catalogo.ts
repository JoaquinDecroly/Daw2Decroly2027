import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoCard } from '../producto-card/producto-card';
import { IProducto } from '../../interfaces/iproducto.interfaces';

@Component({
  imports: [ProductoCard],
  selector: 'app-catalogo',
  styleUrl: './catalogo.css',
  templateUrl: './catalogo.html',
})
export class Catalogo{

  @Input() productos: IProducto[] = [];
  @Output() anadir = new EventEmitter<IProducto>();

  constructor(){
    }
    
    anadirProducto(producto: IProducto) {
      if(producto.id === 0){
        throw new Error("El producto no tiene identificador")
      }

      if(producto.nombre === "" || producto.nombre === null){
        throw new Error("El producto no tiene nombre, ¿que carajos estamos añadiendo?");
      }

      if(producto.precio === 0 || producto.precio <= 0){
        throw new Error("El producto no tiene precio, o es negativo; asi no se puede");
      }

      this.anadir.emit(producto);
        
    }
}
