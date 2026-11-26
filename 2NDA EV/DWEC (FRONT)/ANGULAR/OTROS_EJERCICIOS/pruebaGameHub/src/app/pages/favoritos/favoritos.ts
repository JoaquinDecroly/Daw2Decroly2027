import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { JuegoManager } from '../../services/juego-manager';
import { JuegoCard } from '../../components/juego-card/juego-card';

@Component({
  imports: [JuegoCard, RouterLink],
  selector: 'app-favoritos',
  styleUrl: './favoritos.css',
  templateUrl: './favoritos.html',
})
export class Favoritos {
  juegoManager = inject(JuegoManager);

  private router = inject(Router);

  obtenerFavoritos() {
    return this.juegoManager.favoritos;
  }

  eliminarFavorito(id: number) {
    this.juegoManager.eliminarFavorito(id);
  }

  eliminarJuego(id: number) {
    this.juegoManager.eliminarJuego(id);
  }

  editarJuego(id: number) {
    this.router.navigate(['/juegos/editar', id]);
  }
}