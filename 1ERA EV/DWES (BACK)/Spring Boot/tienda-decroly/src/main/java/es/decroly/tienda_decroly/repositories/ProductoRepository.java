package es.decroly.tienda_decroly.repositories;

import es.decroly.tienda_decroly.domain.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByNombreContainingIgnoreCase(String texto);
    List<Producto> findByPrecioLessThanEqual(BigDecimal precioMaximo);
    List<Producto> findByStockLessThanOrderByStockAsc(int limite);
    @Query("SELECT p FROM Producto p WHERE p.precio > :media")
    List<Producto> buscarMasCarosQueLaMedia(@Param("media") BigDecimal media);

    @Query("SELECT p FROM Producto p WHERE p.precio BETWEEN :MIN AND :MAX")
    List<Producto> buscarEntrePrecios(
            @Param("MIN") BigDecimal min,
            @Param("MAX") BigDecimal max);
}
