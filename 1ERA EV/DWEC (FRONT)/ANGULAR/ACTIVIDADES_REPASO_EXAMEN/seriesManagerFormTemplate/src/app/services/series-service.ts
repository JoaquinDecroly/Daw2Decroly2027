import { Service, inject } from '@angular/core';
import { ISerie } from '../interfaces/iserie.interfaces';
import { FetchService } from './fetch-service';

@Service()
export class SeriesService {

  fetchService = inject(FetchService);

  listaSeries: ISerie[] = [];

  async getSeries(): Promise<ISerie[]> {
        this.listaSeries = await this.fetchService.getSeries();

        return this.listaSeries;
    }

  guardarSerie(serie: ISerie) {
    this.listaSeries.push(serie);

  }

  editarSerie(serie: ISerie) {

  console.log('Serie recibida para editar:', serie);

  const indice = this.listaSeries.findIndex(
    (s) => s.id === serie.id
  );

  console.log('Índice encontrado:', indice);

  if (indice !== -1) {
    this.listaSeries[indice] = serie;
    console.log('Serie modificada correctamente');
  }
}

  eliminarSerie(id: number) {

    const indice = this.listaSeries.findIndex(
      (s) => s.id === id
    );

    if (indice !== -1) {
      this.listaSeries.splice(indice, 1);

    } else {
      throw new Error("La serie no existe.");

    }
  }
}
