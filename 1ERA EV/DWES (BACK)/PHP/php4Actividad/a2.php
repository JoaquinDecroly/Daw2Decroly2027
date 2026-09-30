<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actividades PHP</title>
</head>
<body>
    <?php
    // actividad 1
    echo str_replace("días", "noches", "Buenos días");
    ?>

    <?php
    //actividad 2
    $frase = "buenas tardes señor Diego, compañero mío de DAW";
    echo str_replace("Diego", "Óscar", $frase);
    $frase = str_replace("Diego", "Óscar", $frase);
    substr($frase, "");
    ?>

</body>
</html>
