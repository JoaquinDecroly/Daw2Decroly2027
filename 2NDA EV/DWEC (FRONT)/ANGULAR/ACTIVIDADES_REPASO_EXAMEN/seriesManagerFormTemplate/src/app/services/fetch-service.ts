import { input, Service } from '@angular/core';
import { ISerie } from '../interfaces/iserie.interfaces';
import { IResultadoSerie } from '../interfaces/iresultado-serie.interfaces';

@Service()
export class FetchService {
    listaSeries:ISerie[];
    
    constructor(){
        this.listaSeries = [];  
        this.getSeries();
    }

    getSeries(): Promise<ISerie[]> {
  return fetch("https://api.tvmaze.com/search/shows?q=breaking")
    .then((response) => {
      console.log('Estado HTTP:', response.status);
      return response.json();
    })
    .then((datos: IResultadoSerie[]) => {
      console.log('Datos originales de la API:', datos);

      this.listaSeries = datos.map((element) => element.show);

      console.log('Series transformadas:', this.listaSeries);

      return this.listaSeries;
    })
    .catch((error) => {
      console.error('Error al obtener las series:', error);
      return [];
    });
}
}
