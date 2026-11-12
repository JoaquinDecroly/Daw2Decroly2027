package es.decroly.gimnasio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter //OBTENER DATOS
@Setter //MODIFICAR DATOS
@NoArgsConstructor //CONSTRUCTOR SIN PARÁMETROS
@AllArgsConstructor//CONSTRUCTOR CON PARÁMETROS
public class ActividadDto {
    @NonNull
    @NotEmpty
    @Size(max = 50)
    private String nombre;

    private String monitor;
    /////////////////////////////
    @Size(min=1, max=30)
    private int plazas;
}
