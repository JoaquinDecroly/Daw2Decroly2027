//------CARRITO DE LA COMPRA-------
export class CarritoCompra {
    //---PROPIEDADES DE UN ITEM DEL CARRITO [TIPO_MONEDA, ARRAY_PRODUCTO][CARGAR= ID, NOMBRE, PRECIO PRODUCTO]
    constructor(productos = [], moneda = "€") { //
        this.moneda = moneda;
        this.productos = [];
        this.cargarProductos(productos);
    }

    //-------CARGAR VALORES-------
    cargarProductos(productos) {
        if (!Array.isArray(productos)) {
            throw new TypeError("Los productos del carrito deben ser una lista.");
        }

        this.productos = productos.map((producto, id) => {
            //SI PRICE ES NULL/UNDEFINED, SE USA EL DE LA DERECHA (PRECIO)
            const precioOriginal = producto.price ?? producto.precio;
            //PARSEARLO A NÚMERO
            const precio = Number(precioOriginal);

            //SI EL PRECIO NO ES UNDEFINED, NO ES NULL Y ES UN NÚMERO FINITO
            const tienePrecio = precioOriginal !== undefined
                && precioOriginal !== null
                && Number.isFinite(precio);

            return {
                id,
                sku: producto.SKU ?? producto.sku,
                nombre: producto.name ?? producto.title ?? "Producto sin nombre",
                precio: tienePrecio ? precio : null,
                unidades: 0
            };
        });
    }

    actualizarUnidades(id, unidades) {
        //FUNCIÓN QUE OBTIENE EL PRODUCTO A BASE DEL ID
        const producto = this.obtenerInfoProductos(id);
        const cantidad = Number(unidades);

        if (!Number.isFinite(cantidad)) {
            throw new TypeError("La cantidad debe ser un número finito.");
        }

        if (producto.precio === null && cantidad > 0) {
            throw new RangeError(`El producto ${producto.nombre} no tiene un precio válido.`);
        }

        //UNIDADES = NÚMERO MÁXIMO ENTRE 0 Y (EL MÍNIMO ENTRE 99 Y EL NÚMERO TRUNCADO DE LA CANTIDAD)
        producto.unidades = Math.max(0, Math.min(99, Math.trunc(cantidad)));
        return producto;
    }

    //-----FUNCIÓN PARA OBTENER PRODUCTO MEDIANTE ID-----
    obtenerInfoProductos(id) {
        const producto = this.productos.find((item) => item.id === id);

        if (!producto) {
            throw new RangeError(`No existe un producto con identificador ${id}.`);
        }

        return producto;
    }

    //OBTENER PRODUCTOS (DEL CUAL EL PRODUCTO TENGA UNA CANTIDAD MAYOR A 0)
    obtenerCarrito() {
        const productos = this.productos
            .filter((producto) => producto.unidades > 0)
            .map((producto) => ({
                ...producto,
                subtotal: producto.precio * producto.unidades
            }));

        const total = productos.reduce((suma, producto) => suma + producto.subtotal, 0);

        return {
            productos,
            total,
            moneda: this.moneda
        };
    }
}
