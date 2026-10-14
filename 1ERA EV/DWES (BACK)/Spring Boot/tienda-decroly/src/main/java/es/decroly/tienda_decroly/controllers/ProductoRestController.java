package es.decroly.tienda_decroly.controllers;

import es.decroly.tienda_decroly.domain.Producto;
import es.decroly.tienda_decroly.exceptions.BadRequestException;
import es.decroly.tienda_decroly.exceptions.NotFoundException;
import es.decroly.tienda_decroly.services.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RequestMapping("/productos")
@RestController
public class ProductoRestController {
    private final List<Producto> productos = new ArrayList<>();
    private final AtomicLong secuencia = new AtomicLong();

    private final ProductoService productoService;

    //Constructor
    public ProductoRestController(ProductoService productoService) {//USO DEL CONSTRUCTOR DE PRODUCTO-SERVICE-MEMORIA
        this.productoService = productoService;
    }

///////////////////////////////////////////////////////////////
/// ANOTACIONES
///////////////////////////////////////////////////////////////

    //Listar todos los productos
    @GetMapping
        public List<Producto> listarProductos() {
            return productoService.listarProductos();
        }

    //Obtener un producto por id
    @GetMapping("/{id}")
        public Producto getProductoById(@PathVariable Long id) {
            return productoService.buscarPorId(id);
        }

    //Añade un producto
    @PostMapping
        public Producto add(@RequestBody Producto producto) {
            return productoService.crear(producto.getNombre(), producto.getPrecio(), producto.getStock());
        }

    //Modificar un producto por id
    @PutMapping("/{id}")
        public Producto modProd(@PathVariable Long id, @RequestBody Producto producto) {
            return productoService.modificar(id, producto);
        }

    //Eliminar un producto por id
    @DeleteMapping("/{id}")
        public void remove(@PathVariable Long id) {
            productoService.eliminar(id);
    }

///////////////////////////////////////////////////////////////
/// FUNCIONES AUXILIARES
///////////////////////////////////////////////////////////////

//Comprobar existencia producto por id
    public Producto exists(Long id) {
        return productos.stream()
                .filter(producto -> producto.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("No se encontró el producto con id: " + id));
    }

    //Función añadir un producto
    public void add(String nombre, double precio, int stock) {
        Long nuevoId = secuencia.incrementAndGet();
        productos.add(new Producto(nuevoId, nombre, precio, stock));
    }
}
