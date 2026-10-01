package es.decroly.tienda_decroly.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HolaMundoRestController {

    @GetMapping("/Saludo")
    public String saludo(){
        return "Hola Mundo desde la Tienda Decroly";
    }
}
