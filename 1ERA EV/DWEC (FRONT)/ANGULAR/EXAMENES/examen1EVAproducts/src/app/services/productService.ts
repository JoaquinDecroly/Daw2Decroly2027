import { inject, Service } from '@angular/core';
import { fetchProducts } from './fetchProducts';
import { ListaProductos } from '../components/lista-productos/lista-productos';
import { IProducto } from '../interfaces/iproducto.interfaces';

@Service()
export class productService {
    fetchProducts = inject(fetchProducts);

    listaProductos:IProducto[] = [];


    async listaProducts():Promise<IProducto[]>{
        this.listaProductos = await this.fetchProducts.getProducts();

        return this.listaProductos;
    }

    eliminarProduct(id:string){
        const index = this.listaProductos.findIndex(
            (s) => s.id === id
        );

        if(index != (-1)){
            this.listaProductos.splice(index, 1);
        }else{
            throw new Error("El producto no existe");
        }
    }

    añadirProduct(producto:IProducto){
        this.listaProductos.push(producto);
    }

    // filtros

    filtrarNombre(name:string):IProducto[]{
        return this.fetchProducts.listaProducts.filter((p) => {
            p.name === name
        });
    }

    filtrarCategoria(categoria:string):IProducto[]{
        return this.fetchProducts.listaProducts.filter((c)=> {
                    c.category === categoria
        })
    }

    filtrarPrecio(precio:number):IProducto[]{
        return this.fetchProducts.listaProducts.filter((p)=> {
            p.price === precio
        })
    }

    filtrarActivo(activo:boolean):IProducto[]{
        return this.fetchProducts.listaProducts.filter((a)=> {
            a.active === activo
        })
    }

}
