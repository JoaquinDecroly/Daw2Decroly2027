package es.decroly.tienda_decroly.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import es.decroly.tienda_decroly.dto.producto.ProductoExternoDto;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RespuestaProductosDto(List<ProductoExternoDto> products,
                                    int total) {
}
