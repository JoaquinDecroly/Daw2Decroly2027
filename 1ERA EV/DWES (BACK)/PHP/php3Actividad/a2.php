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
        if (isset($_GET["nombre"], $_GET["email"], $_GET["mensaje"])) {
            echo "Hola " . $_GET["nombre"];
        }
    ?>

<form method="GET" action="">
        Nombre: <input type="text" name="nombre"><br>
    Email: <input type="email" name="email"><br>
        Mensaje: <input type="text" name="mensaje"><br>
          
        <input type="submit" value="Enviar">
    </form>
    <?php
    // actividad 3
    if (isset($_GET["nombre"], $_GET["email"], $_GET["mensaje"])) {
        $nombre = trim($_GET["nombre"]);
        $email = trim($_GET["email"]);
        $mensaje = trim($_GET["mensaje"]);

        if (empty($nombre) || empty($email) || empty($mensaje)) {
            if (empty($nombre)) {
                echo "Error: falta el nombre.<br>";
            }
            if (empty($email)) {
                echo "Error: falta el email.<br>";
            }
            if (empty($mensaje)) {
                echo "Error: falta el mensaje.<br>";
            }
        } else {
            echo "Formulario enviado correctamente.<br>";
            echo "Hola " . htmlspecialchars($nombre) . ", con email: " . htmlspecialchars($email) . ".<br>";
            echo "Mensaje: " . htmlspecialchars($mensaje);
        }
    }
    ?>
</body>
</html>