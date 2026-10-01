package es.decroly.tienda_decroly.controllers;

import es.decroly.tienda_decroly.domain.Producto;
import org.springframework.boot.SpringApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

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

    @GetMapping("/productos")
    public List<Producto> listarProductos() {
        return productos;
    }

    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto> obtenerProducto(@PathVariable Long id) {
        return productos.stream()
                .filter(producto -> producto.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public static void main(String[] args){
        SpringApplication.run(ProductoRestController.class, args);
    }


}
