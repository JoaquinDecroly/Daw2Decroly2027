import { Component, inject } from '@angular/core';
import { JuegoManager } from '../../services/juego-manager';
import { IJuego } from '../../interfaces/ijuego.interfaces';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {
  juegoManager = inject(JuegoManager);

  totalJuegos(){
    return this.juegoManager.juegos.length;
  }

  totalJuegosFavoritos(){
    return this.juegoManager.favoritos.length;
  }

  ultimosAnadidos(): IJuego[] {
    return this.juegoManager.juegos.slice(-3).reverse();
  }
}
