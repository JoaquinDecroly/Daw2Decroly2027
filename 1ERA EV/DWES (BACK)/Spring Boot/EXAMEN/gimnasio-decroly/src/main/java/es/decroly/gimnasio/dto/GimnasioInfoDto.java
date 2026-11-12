package es.decroly.gimnasio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter //OBTENER DATOS
@Setter //MODIFICAR DATOS
@NoArgsConstructor //CONSTRUCTOR SIN PARÁMETROS
@AllArgsConstructor//CONSTRUCTOR CON PARÁMETROS
@Schema(description = "Información general del gimnasio")
public class GimnasioInfoDto {
    @Schema(description = "Nombre del gimnasio", example = "Gimnasio Decroly")
    private String nombre;


    @Schema(description = "Número máximo de plazas libres", example = "30")
    private int maxPlazas;

}
