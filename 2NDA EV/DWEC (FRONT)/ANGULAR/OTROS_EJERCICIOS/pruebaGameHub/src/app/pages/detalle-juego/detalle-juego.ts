import { Component, inject } from '@angular/core';
import { IJuego } from '../../interfaces/ijuego.interfaces';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { JuegoManager } from '../../services/juego-manager';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-detalle-juego',
  styleUrl: './detalle-juego.css',
  templateUrl: './detalle-juego.html',
})
export class DetalleJuego {
  private route = inject(ActivatedRoute);

  private router = inject(Router);

  juegoManager = inject(JuegoManager);
  
  juegoIndex = Number(this.route.snapshot.paramMap.get("id"));

  juego: IJuego | null = null;

  buscarJuego(){
    if(this.juegoIndex){
      this.juego = this.juegoManager.buscarPorId(this.juegoIndex);
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.buscarJuego();
  }

  anadirFavorito() {
    this.juegoManager.anadirFavorito(this.juegoIndex);
  }

  eliminarFavorito() {
    this.juegoManager.eliminarFavorito(this.juegoIndex);
  }

  eliminarJuego() {
    this.juegoManager.eliminarJuego(this.juegoIndex);
    this.router.navigate(['/juegos']);
  }

}
