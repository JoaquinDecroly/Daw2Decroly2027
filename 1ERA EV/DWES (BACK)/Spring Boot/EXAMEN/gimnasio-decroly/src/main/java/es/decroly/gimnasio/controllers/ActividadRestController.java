package es.decroly.gimnasio.controllers;

import es.decroly.gimnasio.dto.ActividadDto;
import es.decroly.gimnasio.dto.GimnasioInfoDto;
import es.decroly.gimnasio.model.Actividad;
import es.decroly.gimnasio.services.Actividad.ActividadService;
import es.decroly.gimnasio.services.Gimnasio.GimnasioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Actividad", description = "Información general de las actividades del gimnasio")
@RequestMapping("api/actividades")
@RestController
@RequiredArgsConstructor
public class ActividadRestController {

    private final ActividadService actividadService;


    //----GET PARA OBTENER TODOS LAS ACTIVIDADES-------
    @Operation(summary = "Listar todos las actividades")
    @ApiResponse(responseCode = "200", description = "Mostrando las actividades de la colección")
    @GetMapping
    public List<Actividad> listarActividades(){
        return actividadService.listarActividades();
    }


    //----GET PARA OBTENER UNA ACTIVIDAD POR ID-----
    @Operation(summary = "Obtener una actividad por id")
    @ApiResponse(responseCode = "200", description = "Actividad encontrado")
    @ApiResponse(responseCode = "404", description = "Actividad no encontrado",
            content = @Content(mediaType = "application/problem+json", schema = @Schema(implementation = ProblemDetail.class)))
    @GetMapping("/{id}")
    public Actividad getActividadById(@PathVariable Long id) {
        return actividadService.buscarPorId(id);
    }


    //---POST PARA CREAR UNA ACTIVIDAD----
    @Operation(summary = "Añadir una actividad")
    @ApiResponse(responseCode = "201", description = "Actividad añadido exitosamente")
    @ApiResponse(responseCode = "400", description = "Datos no válidos (falta titulo actividad, plazas totales, y plazas libres)",
            content = @Content(mediaType = "application/problem+json", schema = @Schema(implementation = ProblemDetail.class)))
    @ApiResponse(responseCode = "409", description = "Ya existe esa actividad",
            content = @Content(mediaType = "application/problem+json", schema = @Schema(implementation = ProblemDetail.class)))
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Actividad add(@RequestBody ActividadDto dto) {
        return actividadService.crear(dto);
    }


    //-----PUT PARA MODIFICAR UNA ACTIVIDAD POR ID-----
    @Operation(summary = "Modificar una actividad por id")
    @ApiResponse(responseCode = "200", description = "Actividad encontrado y modificado exitosamente")
    @ApiResponse(responseCode = "400", description = "Datos no válidos (falta titulo actividad, plazas totales, y plazas libres)",
            content = @Content(mediaType = "application/problem+json", schema = @Schema(implementation = ProblemDetail.class)))
    @ApiResponse(responseCode = "404", description = "Actividad no encontrado, y por ende, no modificado",
            content = @Content(mediaType = "application/problem+json", schema = @Schema(implementation = ProblemDetail.class)))
    @ApiResponse(responseCode = "409", description = "Ya existe otra actividad similar",
            content = @Content(mediaType = "application/problem+json", schema = @Schema(implementation = ProblemDetail.class)))
    @PutMapping("/{id}")
    public Actividad modificar(@PathVariable Long id, @RequestBody ActividadDto dto) {
        return actividadService.modificar(id, dto);
    }


    //------DELETE PARA BORRAR UNA ACTIVIDAD POR ID-----
    @Operation(summary = "Borrar una actividad por id")
    @ApiResponse(responseCode = "204", description = "Actividad encontrado y eliminado exitosamente")
    @ApiResponse(responseCode = "404", description = "Actividad no encontrado, y por ende, no eliminado",
            content = @Content(mediaType = "application/problem+json", schema = @Schema(implementation = ProblemDetail.class)))
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable Long id) {
        actividadService.eliminar(id);
    }

}
