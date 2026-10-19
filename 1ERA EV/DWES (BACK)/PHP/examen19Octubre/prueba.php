<?php
    //variables
    $productos = [

        ["nombre" => "Teclado",  "precio" => 25.50,  "stock" => 12],

        ["nombre" => "Ratón",    "precio" => 15.00,  "stock" => 3],

        ["nombre" => "Monitor",  "precio" => 120.00, "stock" => 7],

        ["nombre" => "Webcam",   "precio" => 45.90,  "stock" => 0],

    ];

    // Mostrar un listado de todos los productos con su nombre, precio y stock.
    foreach ($productos as $p) {
        echo $p["nombre"] . " - " . $p["precio"] . " - " . $p["stock"] . "<br>";
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
    
    
    
    
    ?>