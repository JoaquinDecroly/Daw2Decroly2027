<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    // actividad 1
    <form method="POST" action="">
        Nombre: <input type="text" name="nombre">
        <input type="submit" value="Enviar">
    </form>
    <?php ?>

    
    // actividad 2
    <form method="GET" action="">
        Nombre: <input type="text" name="nombre"><br>
        Edad: <input type="number" name="edad"><br>
        Ciudad: 
        <select name="pais">
            <label for="pais">Selecciona el pais: </label>
                <option value="santander" selected>Santander</option>
                <option value="barcelona">Barcelona</option>
                <option value="madrid">Madrid</option>
        </select><br>
          
        <input type="submit" value="Enviar">
    </form>

    <?php 
        if (isset($_GET["nombre" . "edad" . "ciudad"])) {
            echo "Hola " . $_GET["nombre"];
        }
    ?>

    <?php
    // actividad 3

    ?>
</body>
</html>