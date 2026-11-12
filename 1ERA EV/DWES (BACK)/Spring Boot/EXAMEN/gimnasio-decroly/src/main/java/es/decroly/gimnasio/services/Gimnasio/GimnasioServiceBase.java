package es.decroly.gimnasio.services.Gimnasio;

import es.decroly.gimnasio.config.GimnasioProperties;
import es.decroly.gimnasio.dto.GimnasioInfoDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class GimnasioServiceBase implements GimnasioService {
    private final GimnasioProperties properties;


    //-----METODO OBTENER INFORMACIÓN DE LA BIBLIOTECA----
    @Override
    public GimnasioInfoDto obtenerInfoGimnasio() {
        return new GimnasioInfoDto(properties.nombre(), properties.maxPlazas());
    }

}
