export interface IProducto {
  id: number;
  sku?: string;
  nombre: string;
  precio: number | null;
  unidades: number;
}
