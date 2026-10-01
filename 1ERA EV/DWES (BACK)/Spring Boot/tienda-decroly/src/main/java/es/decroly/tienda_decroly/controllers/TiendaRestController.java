package es.decroly.tienda_decroly.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;

@RestController
public class TiendaRestController {
    @GetMapping("/info")
    public String info(){
        String nombre = "tienda-decroly<br>";
        String ciudad = "Santander<br>";
        LocalTime horarioEntrada = LocalTime.MIDNIGHT;
        LocalTime horarioSalida = LocalTime.NOON;

        return "Nombre Empresa: " + nombre + "Ciudad: " + ciudad + (horarioEntrada + "-" + horarioSalida);
    }
}
