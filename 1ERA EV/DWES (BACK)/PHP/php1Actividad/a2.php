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

    <!--Actividad 2  -->
    <?php
        $edad = 101010101110101010000;
        $carnet = false;

        if($edad >= 18 && $carnet == true){
            echo "Puedes conducir";
        }else{
            echo "No puedes conducir";
        }
    ?>    

    <!-- Actividad 3 -->
    <?php
        $numero1;
        $numero2;
        $numero3;

        $suma = $numero1 + $numero2 + $numero3;

        if ($suma >= 5){
            echo "Media aprovada";
            
            if($numero1 >= 4 || $numero2 > 4 || $numero3 >= 4){
                echo "Supenso, haber estudiao´";
            }else{
                echo "Aprobado, enhorabuena, muy buena";
            
            }
        }

        
    ?>
</body>
</html>