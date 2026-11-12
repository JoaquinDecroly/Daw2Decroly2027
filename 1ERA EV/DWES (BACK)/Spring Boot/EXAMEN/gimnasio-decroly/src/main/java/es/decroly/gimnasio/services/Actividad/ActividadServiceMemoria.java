package es.decroly.gimnasio.services.Actividad;

import es.decroly.gimnasio.config.GimnasioProperties;
import es.decroly.gimnasio.model.Actividad;

import java.util.List;

public class ActividadServiceMemoria extends ActividadServiceBase{
    public ActividadServiceMemoria(GimnasioProperties properties) {
        super(List.of(
                new Actividad(1L, "Pilates", "Laura Gómez", 12, 0),
                new Actividad(2L, "Spinning", "Marcos Ruiz", 20, 8),
                new Actividad(3L, "Yoga", "Laura Gómez", 15, 15),
                new Actividad(4L, "Body Pump", "Ana Torres", 25, 3)
), properties);
    }
}
