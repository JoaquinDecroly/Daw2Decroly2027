import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { JuegoManager } from '../../services/juego-manager';
import { JuegoCard } from '../../components/juego-card/juego-card';

@Component({
  imports: [JuegoCard, RouterLink],
  selector: 'app-juegos',
  styleUrl: './juegos.css',
  templateUrl: './juegos.html',
})
export class Juegos {
  juegoManager = inject(JuegoManager);

  private router = inject(Router);

  obtenerJuegos() {
    return this.juegoManager.juegos;
  }

  aFavoritos(id: number) {
    const juego = this.juegoManager.buscarPorId(id);

    if (juego.favorito) {
      this.juegoManager.eliminarFavorito(id);
    } else {
      this.juegoManager.anadirFavorito(id);
    }
  }

  eliminarJuego(id: number) {
    this.juegoManager.eliminarJuego(id);
  }

  editarJuego(id: number) {
    this.router.navigate(['/juegos/editar', id]);
  }
}