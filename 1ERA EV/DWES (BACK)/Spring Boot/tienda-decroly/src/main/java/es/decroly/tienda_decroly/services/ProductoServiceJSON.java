package es.decroly.tienda_decroly.services;

import es.decroly.tienda_decroly.domain.Producto;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.ClassPathResource;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;


@ConditionalOnProperty(name = "tienda.productos.origen",
        havingValue = "json")

public class ProductoServiceJSON extends ProductoServiceBase {


    public ProductoServiceJSON(ObjectMapper mapper) throws IOException {
        super((ArrayList<Producto>) cargar(mapper));

    }

    private static List<Producto> cargar(ObjectMapper mapper) throws IOException {
        ClassPathResource fichero = new ClassPathResource("productos.json");
        try (InputStream entrada = fichero.getInputStream()) {
            return List.of(mapper.readValue(entrada, Producto[].class));
        }
    }
}
