package es.decroly.tienda_decroly.services;

import es.decroly.tienda_decroly.domain.Producto;
import es.decroly.tienda_decroly.exceptions.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ProductoServiceMemoria  extends ProductoServiceBase implements ProductoService{

    public ProductoServiceMemoria() {
        super((ArrayList<Producto>) List.of(
                new Producto(1L,"teclado", 49.8, 15),
                new Producto(2L, "raton", 66.3, 40),
                new Producto(3L,"mando", 87.5, 17)));
    }
}
