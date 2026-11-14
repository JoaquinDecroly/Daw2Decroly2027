import { Service } from '@angular/core';
import { IProducto } from '../interfaces/iproducto.interfaces';

@Service()
export class FetchService {
  URL: string = 'https://agoodshop.free.beeceptor.com';

  async getProductos(): Promise<IProducto[]> {
    try {
      const response = await fetch(this.URL);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const datos = await response.json();

      if (!Array.isArray(datos)) {
        console.error('La API no ha devuelto una lista de productos:', datos);
        return [];
      }

      return datos.map((element: any) => ({
        ...element,
        unidades: 0,
        enCarrito: false
      })) as IProducto[];

    } catch (error) {
      console.error('No se han podido cargar los productos:', error);
      return [];
    }
  }
}
