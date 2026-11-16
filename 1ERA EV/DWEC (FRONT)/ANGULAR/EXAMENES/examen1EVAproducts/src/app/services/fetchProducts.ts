import { Service } from '@angular/core';
import { IProducto } from '../interfaces/iproducto.interfaces';

@Service()
export class fetchProducts {
    listaProducts:IProducto[];

    constructor(){
        this.listaProducts = [];  
        this.getProducts();
    }

     

    // private connectProducts() {
    //     fetch("http://localhost:8080/api/products")
    //         .then(response => response.json())
    //         .then(datos => {
    //             datos.forEach((element: any) => {
    //                 let product: IProducto = element as IProducto;
    //                 this.listaProducts.push(product)
    //             });
    //         })

    //     console.log(this.listaProducts);
    // }
    getProducts(): Promise<IProducto[]> {
        return fetch("http://localhost:8080/api/products")
            .then((response) => {
            console.log('Estado HTTP:', response.status);
            return response.json();
            })
            .then((datos: IProducto[]) => {
            console.log('Datos originales de la API:', datos);

            this.listaProducts = datos.map((element) => element);

            console.log('Series transformadas:', this.listaProducts);

            return this.listaProducts;
            })
        .catch((error) => {
        console.error('Error al obtener los productos:', error);
        return [];
        });
}
}
///////////////////////////////////////////////////////////


