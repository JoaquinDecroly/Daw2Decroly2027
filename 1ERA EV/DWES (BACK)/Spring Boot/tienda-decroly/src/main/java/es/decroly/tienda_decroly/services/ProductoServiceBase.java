package es.decroly.tienda_decroly.services;

import es.decroly.tienda_decroly.domain.Producto;
import es.decroly.tienda_decroly.exceptions.NotFoundException;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;


public abstract class ProductoServiceBase implements ProductoService{

    private final List<Producto> productos;
    private AtomicLong secuencia = new AtomicLong();

    //Constructor
    public ProductoServiceBase(List<Producto> productosInd) {
//        crear("teclado", 49.8, 15);
//        crear("raton", 66.3, 40);
//        crear("mando", 87.5, 17);
        this.productos = new ArrayList<>(productosInd);

        long maxId = 0;

        for(Producto p : productosInd){
            if(p.getId() > maxId){
                maxId = p.getId();
            }
        }

        this.secuencia = new AtomicLong(maxId);
    }


    //Listar produuctos
    @Override
        public List<Producto> listarProductos() {
            return productos;
        }

    //Buscar por id
    @Override
        public Producto buscarPorId(Long id) {
            Producto producto = exists(id);

            Optional<Producto> producto1 = productos.stream()
                    .filter(p -> p.getId().equals(id))
                    .findFirst();

            return producto1.orElseThrow(() -> new NotFoundException("No se encontró el producto con id: " + id));
        }


    //Crear un producto
    @Override
        public Producto crear(String nombre, double precio, int stock) {
            Long nuevoId = secuencia.incrementAndGet();
            productos.add(new Producto(nuevoId, nombre, precio, stock));
        return null;
    }

    //Modificar un producto
    @Override
        public Producto modificar(Long id, Producto producto) {
            Producto productoExistente = exists(id);
            productoExistente.setNombre(producto.getNombre());
            productoExistente.setPrecio(producto.getPrecio());
            productoExistente.setStock(producto.getStock());

            return productoExistente;
        }


    //Eliminar un producto
    @Override
        public void eliminar(Long id) {
            boolean eliminado = productos.removeIf(producto -> producto.getId().equals(id));

            if (!eliminado) {
                throw new NotFoundException("No se encontró el producto con id: " + id);
            }
            throw new NotFoundException("Se encontró y se borró exitosamente el producto con id: " + id);
        }
////////////////////////////////////////////////
/// FUNCIONES AUXILIARES
////////////////////////////////////////////////

    public Producto exists(Long id) {
        return productos.stream()
                .filter(producto -> producto.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("No se encontró el producto con id: " + id));
    }
}
