<?php
    //array productos
    $productos = [

        ["nombre" => "Teclado",  "precio" => 25.50,  "stock" => 12],

        ["nombre" => "Ratón",    "precio" => 15.00,  "stock" => 3],

        ["nombre" => "Monitor",  "precio" => 120.00, "stock" => 7],

        ["nombre" => "Webcam",   "precio" => 45.90,  "stock" => 0],

    ];

    // Mostrar un listado de todos los productos con su nombre, precio y stock.
    foreach ($productos as $p) {
        echo $p["nombre"] . " - " . $p["precio"] . "€ - " . $p["stock"] . "ud<br>";
    }

    //Calcular y mostrar el valor total del inventario (suma de precio × stock de todos los productos).
    foreach ($productos as $p) {
        $precio += $p["precio"];
        $stock += $p["stock"];
    }
    echo "<br>El total de todos los precios * todos los stock de productos es: " . ($precio * $stock) . " € <br><br>";

    // Mostrar qué productos tienen stock bajo (menos de 5 unidades), distinguiendo el caso de stock igual a 0 como "agotado".
    foreach ($productos as $p) {
        echo $p["nombre"] . " - " . $p["precio"] . " - " . ($p["stock"] < 5 ? ($p["stock"] == 0 ? "Agotado" : "Stock bajo") : $p["stock"]) . "<br>";
    }
    
    // Indicar cuál es el producto más caro y cuál tiene más stock.
        //NO FUNCIONA MUY ALLA
        foreach ($productos as $p) {
        $max1 = PHP_INT_MIN;
        $max2 = PHP_INT_MIN;

            $precioMax = max($p["precio"], $max1);
            $stockMax = max($p["stock"], $max2);
        }
        echo "<br><br>" . $precioMax . " €" . ", y el stock máximo es: " . $stockMax;
        
    //Mostrar cuántos productos en total están agotados.
    foreach ($productos as $p) {
        $cont = 0;
        echo ($p["stock"] == 0 ? ($cont=$cont + 1) : null) . " producto agotado<br>";
    }
    
    
    
    ?>