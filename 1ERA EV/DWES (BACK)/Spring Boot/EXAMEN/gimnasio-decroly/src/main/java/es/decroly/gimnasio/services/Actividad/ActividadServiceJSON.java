package es.decroly.gimnasio.services.Actividad;

import es.decroly.gimnasio.config.GimnasioProperties;
import es.decroly.gimnasio.model.Actividad;
import org.springframework.core.io.ClassPathResource;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class ActividadServiceJSON extends ActividadServiceBase {
    public ActividadServiceJSON(ObjectMapper mapper, GimnasioProperties properties) throws IOException {
        super((ArrayList<Actividad>) cargar(mapper), properties);
    }
    private static List<Actividad> cargar(ObjectMapper mapper) throws IOException {
        ClassPathResource fichero = new ClassPathResource("actividades.json");
        try (InputStream entrada = fichero.getInputStream()) {
            return List.of(mapper.readValue(entrada, Actividad[].class));
        }
    }
}
