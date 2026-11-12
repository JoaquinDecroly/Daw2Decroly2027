package es.decroly.gimnasio.services.Actividad;

import es.decroly.gimnasio.config.GimnasioProperties;
import es.decroly.gimnasio.dto.ActividadDto;
import es.decroly.gimnasio.exceptions.BadRequestException;
import es.decroly.gimnasio.exceptions.ConflictoException;
import es.decroly.gimnasio.exceptions.NotFoundException;
import es.decroly.gimnasio.model.Actividad;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.IntStream;
import java.util.stream.Stream;
@Service
public class ActividadServiceBase implements ActividadService{

        private final List<Actividad> actividades;

        private final AtomicLong secuencia;

    public ActividadServiceBase(List<Actividad> actividadInd, GimnasioProperties properties){
            this.actividades = new ArrayList<>(actividadInd);
            long maxId = 0;

            for(Actividad a : actividadInd){
                if(a.getId() > maxId){
                    maxId = a.getId();
                }
            }

            this.secuencia = new AtomicLong(maxId);
        }

        //-----METODO LISTAR ACTIVIDADES----
        @Override
        public List<Actividad> listarActividades() {
            return actividades;
        }

        //----METODO BUSCAR ACTIVIDAD POR ID------
        @Override
        public Actividad buscarPorId(Long id) {
            return actividades.stream()
                    .findFirst().filter(a -> a.getId() == id)
                    .orElseThrow(() -> new NotFoundException("No se encontró la actividad con id: " + id));
        }

        //----METODO COMPROBAR SI EXISTE UNA ACTIVIDAD POR ID------
        @Override
        public boolean existePorId(Long id) {
            return actividades.stream()
                    .anyMatch(a -> a.getId() == id);
        }

        //-----METODO CREAR ACTIVIDAD-----
        @Override
        public Actividad crear(ActividadDto actividad) {
            validar(actividad);
            boolean nombreExiste = actividades.stream()
                    .anyMatch(c -> c.getNombre().equalsIgnoreCase(actividad.getNombre()));

            if (nombreExiste) {
                throw new ConflictoException("Ya existe una actividad con el nombre: " + actividad.getNombre());
            }

            Long nId = secuencia.incrementAndGet();
            Actividad nueva = new Actividad(nId, actividad.getNombre(), actividad.getMonitor(), actividad.getPlazas(), plazasLibresDto(actividad));
            actividades.add(nueva);
            return nueva;
        }

        //----METODO MODIFICAR CATEGORIA----
        @Override
        public Actividad modificar(Long id, ActividadDto actividad) {
            validar(actividad);
            Actividad actividadMod = buscarPorId(id);
            actividadMod.setNombre(actividad.getNombre());
            actividadMod.setPlazasLibres((int) plazasLibres(actividadMod).count());
            return actividadMod;
        }



    //------METODO ELIMINAR CATEGORIA-----
        @Override
        public void eliminar(Long id) {
            boolean remove = actividades.removeIf(categoria -> categoria.getId() == id);
            if (!remove) {
                throw new NotFoundException("No se encontró la categoría con id: " + id);
            }
        }

    //-----METODO AUXILIAR PARA CONTAR LAS PLAZAS LIBRES DE UNA ACTIVIDAD DADA LA ACTIVIDAD (QUE A SU VEZ ES OBTENIDA EN MODIFICAR MEDIANTE EL ID)-------
    private Stream<Actividad> plazasLibres(Actividad actividadMod) {
        return actividades.stream().filter( a-> actividadMod.getPlazasLibres() == a.getPlazasLibres());
    }
    //-----METODO AUXILIAR PARA CONTAR LAS PLAZAS LIBRES DE UNA ACTIVIDAD DADA LA ACTIVIDAD (QUE A SU VEZ ES OBTENIDA EN MODIFICAR MEDIANTE EL ID)-------
    private int plazasLibresDto(ActividadDto actividadMod) {
        Stream<Actividad> actividadesPlazasLibresDto = actividades.stream().filter( a-> actividadMod.getPlazas() == a.getPlazas());
        actividadesPlazasLibresDto.flatMapToInt(actividad -> IntStream.of(actividad.getPlazasLibres()));

        return Math.toIntExact(actividadesPlazasLibresDto.count());
    }

    //----AUXILIAR METODO VALIDACION----
    private void validar(ActividadDto dto) {
        if (dto == null) {
            throw new BadRequestException("El libro es obligatorio");
        }
        if (dto.getNombre().isBlank()) {
            throw new BadRequestException("El ISBN es obligatorio");
        }
        if (dto.getPlazas() < 1) {
            throw new BadRequestException("Debe haber al menos un ejemplar");
        }
    }
}
