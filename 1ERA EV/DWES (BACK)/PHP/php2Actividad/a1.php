

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    //  actividad 1
    $numero = 7678656987;

    if(($numero % 2) == 0){
        echo "El número actual: " . $numero . " es un número par";
    }else{
        echo "El número actual: " . $numero . " es un número impar";
    }

    ?>
    <?php
        // actividad 2
        $diaSemana = [];
        for ($i = 0; $i < 8; $i++){
            $diaSemana[] = $i;
        }

        switch ($diaSemana[0]){
            case 1:
                echo "Lunes";
            break;
            case 2:
                echo "Martes"
            break;
            case 3:
                echo "Miércoles";
            break;
            case 4:
                echo "Jueves";
            break;
            case 5:
                echo "Viernes";
            break;
            case 6:
                echo "Sábado";
            break;
            case 7:
                echo "Domingo";
            break;
            default:
                echo "1 al 7, no es tan difícil mano";


    ?>

    <?php
    // actividad 3
    $nota = 7;

    switch ($nota){
        case $nota >= 1 && $nota <= 4:
            echo "Suspenso";
            var_dump($nota);
        break;

        case $nota == 5;
            echo "Suficiente";
            var_dump($nota);
        break;

        case $nota == 6;
            echo "Bien";
            var_dump($nota);
        break;

        case $nota >= 7 && $nota <= 8;
            echo "Notable " . ($nota == 7 ? "Bajo" : "Alto");
            var_dump($nota);
        break;

        case $nota >= 9 && $nota <= 10;
            echo "Notable " . ($nota == 9 ? "Bajo" : "Alto");
            var_dump($nota);
        break;
    }
    ?>

    <?php
        // actividad 4
        $usuario = "user";
        $contraseña = "segura";
        $activo = false;

        if($activo){
            echo "Se le recuerda señor " . $user;

        }else{
           if($usuario == $usuario && $contraseña == $contraseña){
                echo "Se ha logeado correctamente, señor " . $user
                $activo = true;
            } else{
                if ($usuario != $usuario){
                    echo "El usuario no coincide"
                }elseif($contraseña != $contraseña){
                    echo "La contraseña es incorrecta"
                }
            } 
        }

    ?>
</body>
</html>