package es.decroly.tienda_decroly.dto.moneda;

import java.math.BigDecimal;

public record PrecioMonedaDto(Long idProducto, String moneda,
                              double tipoCambio, BigDecimal total) {
}
