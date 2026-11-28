import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interfaces';

@Component({
  imports: [],
  selector: 'app-user-card',
  styleUrl: './user-card.css',
  templateUrl: './user-card.html',
})
export class UserCard {
  @Input() usuario !: IUsuario;

  @Output() editar = new EventEmitter<number>();

  @Output() eliminar = new EventEmitter<number>();

  @Output() favorito = new EventEmitter<number>();
}
