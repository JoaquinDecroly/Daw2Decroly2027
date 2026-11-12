package es.decroly.gimnasio.services.Actividad;

import es.decroly.gimnasio.dto.ActividadDto;
import es.decroly.gimnasio.model.Actividad;
import org.springframework.stereotype.Service;
import java.util.List;


public interface ActividadService {
    List<Actividad> listarActividades();

    Actividad buscarPorId(Long id);

    boolean existePorId(Long id);

    Actividad modificar(Long id, ActividadDto actividad);

    Actividad crear(ActividadDto actividad);

    void eliminar(Long id);

}
