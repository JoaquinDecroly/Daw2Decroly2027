package es.decroly.tienda_decroly.services;

import es.decroly.tienda_decroly.domain.Producto;


import java.util.List;

public interface ProductoService {
    List<Producto> listarProductos();

    Producto buscarPorId(Long id);

    Producto crear(String nombre, double precio, int stock);

    Producto modificar(Long id, Producto producto);
    void eliminar(Long id);

}
