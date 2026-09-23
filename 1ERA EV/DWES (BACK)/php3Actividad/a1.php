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
    function saludo($nombre){
        return echo "Hola " . $nombre;
    }
    ?>

    <?php
    // actividad 2
    function sumar($a, $b){
        return echo "Suma: " .$a. " + ". $b. " = ". ($a + $b);
    }
    ?>

    <?php
    // actividad 3
    function calcularPrecioFinal($precio, $iva = 21){
        return "Precio final con valor producto [" .$precio. "€ ] y valor IVA [" .$iva. "% ] = " .($precio * ($iva / 100)) . "€";
    }
    ?>

    <?php
    // actividad 4
    function esMayorDeEdad($edad){
        $mayorEdad = false;

        if($edad >= 18){
            $mayorEdad = true;
        }

        return $mayorEdad;

    }
    ?>

    <?php
    // actividad 5
    function factorial($n){
        $fact = 1;

        for ($i = $n; $i >= 1; $i--) {
            $fact *= $i;
        }

        return $fact;
    }
    ?>

    <?php
    // actividad 6
    $cont = 0;

    function incrementar(){
        global $cont;
        $cont += 1;
    }

    incrementar();
    echo "Contador global: " .$cont;

    ?>
</body>
</html>