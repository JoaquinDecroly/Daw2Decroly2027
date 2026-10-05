package es.decroly.tienda_decroly.controllers;

import es.decroly.tienda_decroly.domain.Producto;
import org.springframework.boot.SpringApplication;
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

    public ProductoRestController(){
        add("teclado", 49.8, 15);
        add("raton", 66.3, 40);
        add("mando", 87.5, 17);
    }

    public void add(String nombre, double precio, int stock){
        Long nuevoId = secuencia.incrementAndGet();
        productos.add(new Producto(nuevoId, nombre, precio, stock));
    }

    @GetMapping()
    public List<Producto> listarProductos() {
        return productos;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProducto(@PathVariable Long id) {
        return productos.stream()
                .filter(producto -> producto.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public Producto add(@RequestBody Producto producto){
        add(producto.getNombre(), producto.getPrecio(), producto.getStock());
        return producto;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> modProd(@PathVariable Long id, @RequestBody Producto producto) {
        for (int i = 0; i < productos.size(); i++) {
            Producto p = productos.get(i);
            if (p.getId().equals(id)) {
                    p.setNombre(producto.getNombre());
                    p.setPrecio(producto.getPrecio());
                    p.setStock(producto.getStock());
                return ResponseEntity.ok(p);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remove(@PathVariable Long id){
        boolean eliminado = productos.removeIf(producto -> producto.getId().equals(id));
        if (eliminado) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }



    public static void main(String[] args){
        SpringApplication.run(ProductoRestController.class, args);
    }


}
