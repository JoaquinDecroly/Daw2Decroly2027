package es.decroly.tienda_decroly.services;

import es.decroly.tienda_decroly.domain.Producto;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

public class ProductoServiceJSON extends ProductoServiceBase{
    public ProductoServiceJSON(ObjectMapper mapper) {
    }

    private static List<Producto> cargar(ObjectMapper mapper) {
    }
}
