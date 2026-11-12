package es.decroly.gimnasio.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.UUID;
import org.hibernate.validator.constraints.UniqueElements;

@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class Actividad {
    @UniqueElements
    @UUID
    private long id;
    @NonNull
    @NotEmpty
    private String nombre;
    private String monitor;
    /////////////////////////////
    @Size(min=1, max=30)
    private int plazas;
    private int plazasLibres;

    public Actividad(Long nId, @NonNull @NotEmpty @Size(max = 50) String nombre, String monitor, @Size(min=1, max=30) int plazas) {
        this.id = nId;
        this.nombre = nombre;
        this.monitor = monitor;
        this.plazas = plazas;
    }
}
