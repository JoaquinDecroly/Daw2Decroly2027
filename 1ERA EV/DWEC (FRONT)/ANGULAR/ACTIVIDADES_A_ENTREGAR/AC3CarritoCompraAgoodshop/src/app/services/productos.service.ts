import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IProducto } from '../interfaces/iproducto.interfaces';

type CatalogoProductos = {
  productos: IProducto[];
  moneda: string;
  aviso: string | null;
};

type CacheProductos = {
  productos: IProducto[];
  moneda: string;
  fecha: number;
};

const CACHE_KEY = 'carroVista.products';
const CACHE_DURATION = 5 * 60 * 60 * 1000;
const PRODUCTS_URL = 'https://agoodshop.free.beeceptor.com';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {
  private readonly http = inject(HttpClient);

  async cargarProductos(): Promise<CatalogoProductos> {
    // Se reutiliza la caché mientras siga vigente; si no, se consulta el catálogo remoto.
    const cache = this.leerCache();
    // Una caché futura o con más de cinco horas se considera caducada.
    const cacheVigente =
      cache !== null &&
      Number.isFinite(cache.fecha) &&
      Date.now() >= cache.fecha &&
      Date.now() - cache.fecha < CACHE_DURATION;

    if (cacheVigente && cache) {
      return { ...cache, aviso: null };
    }

    try {
      const respuesta: unknown = await firstValueFrom(
        this.http.get<unknown>(PRODUCTS_URL),
      );
      const catalogo = this.normalizarCatalogo(respuesta);
      this.guardarCache(respuesta);
      return { ...catalogo, aviso: null };
    } catch (error) {
      if (cache) {
        // Si falla la red, conserva los datos guardados; sin caché, deja que el error llegue al componente.
        console.error('No se pudieron actualizar los productos:', error);
        return {
          ...cache,
          aviso: 'No se pudo actualizar el catálogo; se muestran los datos guardados.',
        };
      }

      throw error;
    }
  }
  //Leer productos guardados en LocalStorage del navegador
  private leerCache(): CacheProductos | null {
    try {
      const guardado = localStorage.getItem(CACHE_KEY);
      if (!guardado) {
        return null;
      }

      const dato: unknown = JSON.parse(guardado);
      if (!this.esObjeto(dato) || !Array.isArray(dato['products'])) {
        // Descarta la entrada corrupta para no volver a intentar usarla en la siguiente carga.
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return {
        productos: this.normalizarProductos(dato['products']),
        moneda: typeof dato['currency'] === 'string' ? dato['currency'] : '€',
        fecha: typeof dato['_cachedAt'] === 'number' ? dato['_cachedAt'] : Number.NaN,
      };
    } catch (error) {
      console.error('Error al leer la caché de productos:', error);
      return null;
    }
  }

  private guardarCache(respuesta: unknown): void {
    try {
      // Guarda la respuesta original normalizada junto con la fecha de caché.
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ ...this.normalizarRespuesta(respuesta), _cachedAt: Date.now() }),
      );
    } catch (error) {
      console.error('Error al guardar la caché de productos:', error);
    }
  }

  private normalizarCatalogo(respuesta: unknown): Omit<CatalogoProductos, 'aviso'> {
    // Convierte el formato externo de la API al catálogo que consumen los componentes.
    const dato = this.normalizarRespuesta(respuesta);
    return {
      productos: this.normalizarProductos(dato['products'] as unknown[]),
      moneda: typeof dato['currency'] === 'string' ? dato['currency'] : '€',
    };
  }

  private normalizarRespuesta(respuesta: unknown): Record<string, unknown> {
    // Comprueba la estructura mínima esperada antes de leer sus propiedades.
    if (!this.esObjeto(respuesta) || !Array.isArray(respuesta['products'])) {
      throw new Error('La respuesta del catálogo no contiene una lista de productos.');
    }
    return respuesta;
  }

  private normalizarProductos(productos: unknown[]): IProducto[] {
    // Adapta los nombres de campos de la API y aplica valores seguros si faltan datos.
    return productos.map((producto, id) => {
      const dato = this.esObjeto(producto) ? producto : {};
      // Admite ambos nombres de precio y marca como inválidos los valores que no sean numéricos.
      const precioOriginal = dato['price'] ?? dato['precio'];
      const precioNumerico = Number(precioOriginal);
      const precio =
        precioOriginal !== null &&
        precioOriginal !== undefined &&
        Number.isFinite(precioNumerico)
          ? precioNumerico
          : null;
      const skuOriginal = dato['SKU'] ?? dato['sku'];
      const sku =
        typeof skuOriginal === 'string' || typeof skuOriginal === 'number'
          ? String(skuOriginal)
          : undefined;
      const nombreOriginal = dato['name'] ?? dato['title'];
      const nombre =
        typeof nombreOriginal === 'string' && nombreOriginal.trim()
          ? nombreOriginal
          : 'Producto sin nombre';

      return {
        id,
        nombre,
        precio,
        unidades: 0,
        ...(sku ? { sku } : {}),
      };
    });
  }

  private esObjeto(dato: unknown): dato is Record<string, unknown> {
    // Comprueba que el dato se pueda leer como objeto y no sea null ni un array.
    return typeof dato === 'object' && dato !== null && !Array.isArray(dato);
  }
}
