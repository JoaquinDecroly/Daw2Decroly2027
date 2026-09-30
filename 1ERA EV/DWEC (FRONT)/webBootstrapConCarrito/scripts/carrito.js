import { Producto } from "./producto.js";

class CarritoCompra{

productos = [
    SKU,
    unidades,
    precio
]

    constructor(productos){
    }

    actualizarUnidades(id, unidades){
        //Actualizar unidades por id = unidades * precio/ud
        this.Producto.SKU = Producto.SKU;
        this.Carrito.unidades = this.Carrito.unidades * Producto.precio;
    }

    obtenerInfoProductos(id){
        Producto.SKU = Producto.SKU;
        this.Carrito.unidades = Carrito.unidades;
        Producto.precio = Producto.precio;
    }

    obtenerCarrito(){
        this.Carrito.total = this.Carrito.unidades * Producto.precio;
        this.Carrito.moneda = "EU (€)";
        this.productos = this.productos;
    }
}