<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php

    // actividad 1
        $arrayProductos= array("Leche", "Huevos", "Pollo", "Soja Texturizada", "Ben");
            foreach ($arrayProductos as $indice => $producto){
                echo ($indice + 1) . " , " . $producto;
            }
    ?>

    <?php
    // actividad 2
        $producto = array(
            "nombre" => "Leche",
            "precio" => 1.50,
            "stock" => 50
        );

        echo "Nombre: " . $producto["nombre"] . "<br>";
        echo "Precio: " . $producto["precio"] . " €<br>";
        echo "Stock: " . $producto["stock"] . " unidades<br>";
    ?>

    <?php
    // actividad 3
        $producto1 = array(
            "nombre" => "Leche",
            "precio" => 1.50,
            "stock" => 50
        );

        $producto2 = array(
            "nombre" => "Huevos",
            "precio" => 3.50,
            "stock" => 50
        );

        $total = ($producto1["precio"] * $producto1["stock"]) + ($producto2["precio"] * $producto2["stock"]);

        echo "Precio total de la compra: " . $total . " €";
    ?>

    <?php
    // actividad 4
        $productos = array(
            array("nombre" => "Leche", "precio" => 1.50, "categoria" => "Lacteos"),
            array("nombre" => "Queso", "precio" => 2.20, "categoria" => "Lacteos"),
            array("nombre" => "Pan", "precio" => 1.10, "categoria" => "Panaderia"),
            array("nombre" => "Croissant", "precio" => 1.80, "categoria" => "Panaderia")
        );

        $categoriaBuscada = "Lacteos";
        $total = 0;

        foreach ($productos as $producto) {
            if ($producto["categoria"] == $categoriaBuscada) {
                echo $producto["nombre"] . " - " . $producto["precio"] . " €<br>";
                $total += $producto["precio"];
            }
        }

        echo "Total de la categoría " . $categoriaBuscada . ": " . $total . " €";
    ?>

</body>
</html>