import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { SeriesService } from '../../services/series-service';
import { SerieCard } from '../serie-card/serie-card';
import { ISerie } from '../../interfaces/iserie.interfaces';

@Component({
  imports: [SerieCard],
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-lista-series',
  styleUrl: './lista-series.css',
  templateUrl: './lista-series.html',
})
export class ListaSeries {
  seriesService = inject(SeriesService);

  @Output() editar = new EventEmitter<ISerie>();

 ngOnInit(): void {
  this.seriesService.getSeries().then((series) => {
    console.log('Series recibidas:', series);
    console.log('Lista del servicio:', this.seriesService.listaSeries);
  });
}

  eliminarSerie($event: number) {
    this.seriesService.eliminarSerie($event);
  }

  editarSerie($event: ISerie) {
    this.editar.emit($event);
  }
}
