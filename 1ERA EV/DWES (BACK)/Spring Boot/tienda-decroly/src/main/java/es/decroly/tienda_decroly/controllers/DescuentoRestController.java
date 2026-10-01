package es.decroly.tienda_decroly.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DescuentoRestController {

    @GetMapping("/descuento/{precio}")
    public String precio(@PathVariable double precio, @RequestParam(defaultValue = "10") double descuento){
        precio = 200.0;
        double total;

        total = precio - (precio * (descuento/100));

        return "Precio= " + precio + "€<br>Descuento= " + descuento + "%<br>Total= " + total;
    }

    
}
