package es.decroly.gimnasio.controllers;

import es.decroly.gimnasio.dto.GimnasioInfoDto;
import es.decroly.gimnasio.services.Gimnasio.GimnasioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Actividades", description = "Información general de la biblioteca")
@RequestMapping("api/gimnasio")
@RestController
@RequiredArgsConstructor
public class GimnasioRestController {
    private final GimnasioService gimnasioService;

    //----GET PARA OBTENER LA INFORMACIÓN DEL GIMNASIO-----
    @Operation(summary = "Información del gimnasio",
            description = "Devuelve el nombre del gimnasio, así como el número de plazas libres máximas configurados")
    @ApiResponse(responseCode = "200", description = "Información del gimnasio")
    @GetMapping("/info")
    public GimnasioInfoDto obtenerInfoGimnasio() {
        return gimnasioService.obtenerInfoGimnasio();
    }
}
