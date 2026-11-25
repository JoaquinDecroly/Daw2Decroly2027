package es.decroly.tienda_decroly.dto.precio;

import java.math.BigDecimal;

public record PrecioDto(Long idProducto, BigDecimal base,
                        double iva, BigDecimal total) {
}
