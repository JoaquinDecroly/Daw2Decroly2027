import { Component, inject } from '@angular/core';
import { JuegoManager } from '../../services/juego-manager';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {
  juegoManager = inject(JuegoManager);
}
