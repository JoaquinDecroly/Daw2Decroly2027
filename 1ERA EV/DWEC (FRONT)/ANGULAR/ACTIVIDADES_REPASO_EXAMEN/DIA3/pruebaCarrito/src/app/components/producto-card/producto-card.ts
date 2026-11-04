import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProducto } from '../../interfaces/iproducto.interfaces';

@Component({
  imports: [],
  selector: 'app-producto-card',
  styleUrl: './producto-card.css',
  templateUrl: './producto-card.html',
})
export class ProductoCard {
  @Input() producto!:IProducto;
  @Output() anadir = new EventEmitter<IProducto>();


  constructor(){
  }


  anadirProducto(){
    this.anadir.emit(this.producto);
  }

}
