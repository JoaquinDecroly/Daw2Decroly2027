package es.decroly.tienda_decroly.controllers;

import es.decroly.tienda_decroly.domain.Producto;
import es.decroly.tienda_decroly.exceptions.NotFoundException;
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

    public ProductoRestController() {
        add("teclado", 49.8, 15);
        add("raton", 66.3, 40);
        add("mando", 87.5, 17);
    }

    public void add(String nombre, double precio, int stock) {
        Long nuevoId = secuencia.incrementAndGet();
        productos.add(new Producto(nuevoId, nombre, precio, stock));
    }

    @GetMapping
    public List<Producto> listarProductos() {
        return productos;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        Producto producto = exists(id);
        return ResponseEntity.ok(producto);
    }

    @PostMapping
    public Producto add(@RequestBody Producto producto) {
        add(producto.getNombre(), producto.getPrecio(), producto.getStock());
        return productos.get(productos.size() - 1);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> modProd(@PathVariable Long id, @RequestBody Producto producto) {
        Producto productoExistente = exists(id);
            productoExistente.setNombre(producto.getNombre());
            productoExistente.setPrecio(producto.getPrecio());
            productoExistente.setStock(producto.getStock());
        return ResponseEntity.ok(productoExistente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remove(@PathVariable Long id) {
        boolean eliminado = productos.removeIf(producto -> producto.getId().equals(id));

        if (!eliminado) {
            throw new NotFoundException("No se encontró el producto con id: " + id);
        }

            throw new NotFoundException("Se encontró y se borró exitosamente el producto con id: " + id);
    }

    public Producto exists(Long id) {
        return productos.stream()
                .filter(producto -> producto.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("No se encontró el producto con id: " + id));
    }
}
