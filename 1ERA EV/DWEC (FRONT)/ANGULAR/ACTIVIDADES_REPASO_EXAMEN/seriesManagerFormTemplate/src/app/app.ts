import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Formulario } from './components/formulario/formulario';
import { ListaSeries } from './components/lista-series/lista-series';
import { ISerie } from './interfaces/iserie.interfaces';
@Component({
  imports: [Formulario, ListaSeries],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('seriesManagerFormTemplate');
  serieSeleccionada: ISerie | null = null;

  editarSerie($event: ISerie) {
    this.serieSeleccionada = $event;
  }
}
