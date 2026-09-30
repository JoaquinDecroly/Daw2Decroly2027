<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- Actividad 1 -->
    <?php
        $nombre = "Juan";
        echo "Hola buenas tardes bienvenido " . $nombre;
    ?>

    <!--Actividad 2  -->
    <?php
        $texto = "A";
        $apellidos = "B";
        $edad = 101010101110101010000;

        echo "Hola" . $nombre . $apellido . "con edad: " . $edad;
        
    ?>

    <!-- Actividad 3 -->
    <?php
        $numero1 = 5;
        $numero2 = 10;
        $suma = $numero1 + $numero2;
        $resta = $numero1 - $numero2;
        $multiplicacion = $numero1 * $numero2;
        $division = $numero1 / $numero2;
        echo "Con los números " . $numero1 . " y " . $numero2 . "<br> tenemos: <br>";
        echo "Suma: " . $suma ;
        echo "Resta: " . $resta;
        echo "Multiplicación: " . $multiplicacion;
        echo "División: " . $division;
    ?>

    <!-- Actividad 4 -->
    <?php 
        $string = "Hola";
        $int = 1;
        $float = 1.0;
        $boolean = false;
        echo "El tipo de dato de la variable string es: " . gettype($string) . "<br>";
        echo "El tipo de dato de la variable int es: " . gettype($int) . "<br>";
        echo "El tipo de dato de la variable float es: " . gettype($float) . "<br>";
        echo "El tipo de dato de la variable boolean es: " . gettype($boolean) . "<br>";
    ?>

    <!-- Actividad 5 -->
    <?php
        $a = "8";
        $b = 8;
        var_dump($a == $b);
        // Da valor true, ya que el operador == compara solamente el valor
        var_dump($a === $b);
        // Da valor false, ya que el operador === compara además del valor, el tipo de dato
    
    ?>
</body>
</html>