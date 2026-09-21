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
        for ($i = 0; $i < 11; $i++){
            echo "Tabla ( ". $i ". )"
                for ($i2 = 0; $i2 < 11; $i2++){
                    echo "  " . $i . "  x  " . $i2 . "   =   " . ($i * $i2) . "     <br>"
                }
        }
    ?>

    <?php
    // actividad 2
        for ($i = 0; $i < 51; $i++){
             while((($i % 2))== 0){
                while ($i != 0){
                    echo " " . $i . "  +  " . ($i - 2) . "   =   " . ($i - ($i - 2)); 
                }
             }    
        } 
    ?>

    <?php
    // actividad 3
        for ($i1 = 10; $i1 < 0; $i1--){
           $i1 = $i; 
        }

        do{
            echo $i1 . "   -   " . $i . "   =   " . ($i1 - $i) . "<br>";
        }while($i1 != 0);
        
    ?>

    <?php
    // actividad 4
        // parte 1
        $precios = array(12.5, 8, 25.3, 4.99, 15);
        foreach ($precio * 0.21);

        // parte 2
        for ($i = 0; $i < 6; $i++){
            echo "Tabla ( ". $i ". )"
                for ($i2 = 0; $i2 < 11; $i2++){
                    echo "  " . $i . "  x  " . $i2 . "   =   " . ($i * $i2) . "     |<br>"
                }
        }
    ?>
</body>
</html>