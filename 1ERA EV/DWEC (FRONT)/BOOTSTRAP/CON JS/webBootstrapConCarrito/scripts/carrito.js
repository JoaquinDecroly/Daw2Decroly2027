export class CarritoCompra {
    constructor(productos = [], moneda = "€") {
        this.moneda = moneda;
        this.productos = [];
        this.cargarProductos(productos);
    }

    cargarProductos(productos) {
        if (!Array.isArray(productos)) {
            throw new TypeError("Los productos del carrito deben ser una lista.");
        }

        this.productos = productos.map((producto, id) => {
            const precioOriginal = producto.price ?? producto.precio;
            const precio = Number(precioOriginal);
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
        const producto = this.obtenerInfoProductos(id);
        const cantidad = Number(unidades);

        if (!Number.isFinite(cantidad)) {
            throw new TypeError("La cantidad debe ser un número finito.");
        }

        if (producto.precio === null && cantidad > 0) {
            throw new RangeError(`El producto ${producto.nombre} no tiene un precio válido.`);
        }

        producto.unidades = Math.max(0, Math.min(99, Math.trunc(cantidad)));
        return producto;
    }

    obtenerInfoProductos(id) {
        const producto = this.productos.find((item) => item.id === id);

        if (!producto) {
            throw new RangeError(`No existe un producto con identificador ${id}.`);
        }

        return producto;
    }

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
