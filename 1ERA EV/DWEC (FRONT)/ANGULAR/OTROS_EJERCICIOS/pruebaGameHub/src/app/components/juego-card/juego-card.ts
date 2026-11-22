import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJuego } from '../../interfaces/ijuego.interfaces';

@Component({
  imports: [],
  selector: 'app-juego-card',
  styleUrl: './juego-card.css',
  templateUrl: './juego-card.html',
})
export class JuegoCard {
@Input() juego!: IJuego


@Output() editar = new EventEmitter<number>();


@Output() eliminar = new EventEmitter<number>();


@Output() favorito = new EventEmitter<number>();

}
