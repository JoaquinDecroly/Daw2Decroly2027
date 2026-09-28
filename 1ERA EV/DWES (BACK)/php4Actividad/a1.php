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
    $ruta = "https://jsonplaceholder.typicode.com/users"; //url de donde se saca la ruta (equivalencia resources/users.json)
    $contenido = file_get_contents($ruta); //obtener contenido
    $usuarios = $contenido === false ? null : json_decode($contenido, true); //si existe decodificar contenido de json

    if (!is_array($usuarios)) { //no es una lista
        echo "No se pudieron cargar los usuarios del archivo JSON.";
    } else { //es una lista

    //CREAR ENCABEZADO TABLA
        echo "<h1>Usuarios</h1>";
        echo "<table border=\"1\">";
        echo "<thead><tr><th>ID</th><th>Nombre</th><th>Usuario</th><th>Email</th><th>Ciudad</th></tr></thead>";
        echo "<tbody>";

    //CREAR CONTENIDO TABLA ITERANDO SOBRE LOS USUARIOS
        foreach ($usuarios as $usuario) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars((string) $usuario["id"], ENT_QUOTES, "UTF-8") . "</td>";
            echo "<td>" . htmlspecialchars($usuario["name"], ENT_QUOTES, "UTF-8") . "</td>";
            echo "<td>" . htmlspecialchars($usuario["username"], ENT_QUOTES, "UTF-8") . "</td>";
            echo "<td>" . htmlspecialchars($usuario["email"], ENT_QUOTES, "UTF-8") . "</td>";
            echo "<td>" . htmlspecialchars($usuario["address"]["city"], ENT_QUOTES, "UTF-8") . "</td>";
            echo "</tr>";
        }
        echo "</tbody></table>";
    }
    ?>

     // ejercicio 2 
    <form method="GET" action=""> //CREAR FORMULARIO DE SOLO EMAIL
        Email: <input type="email" name="email"><br>
        <input type="submit" value="Enviar">
    </form>

    <?php
    if (isset($_GET["email"])) { 
       $email = $_GET["email"]; //OBTENER EMAIL FORMULARIO

        if (filter_var($email, FILTER_VALIDATE_EMAIL)) { //EMAIL VALIDO
           echo "Perfectísimamente valido";
        }else{ //EMAIL NO VALIDO
            echo "Perfectísimamente invalido";
        }
    }
    ?>

    //ejercicio 3
    <form action="" method="get">
        <input type="number" name="edad" min="1">    
    </form>
    <?php
    if (isset($_GET["edad"])) {
        $edad = $_GET["edad"]; //OBTENER EDAD
        if(is_numeric($edad)) { //COMPROBAR EDAD NUMERICA
            echo "Edad lista para hacer cálculos con";
        }else{
            session_abort();
        }
    }
    ?>

    // ejercicio 4
    ?>
    <form action="" method="post">
        <label>Nombre: <input type="text" name="nombre"></label><br>
        <label>Comentario: <input type="text" name="comentario"></label><br>
        <input type="submit" value="Enviar">
    </form>
    <?php
    if (isset($_POST["nombre"], $_POST["comentario"])) {
        $nombre = filter_var($_POST["nombre"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $comentario = filter_var($_POST["comentario"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);

        // Escapar datos evita que HTML o JavaScript enviado por un usuario se ejecute al mostrarlo; valida también los datos según las reglas antes de guardarlos.
        echo "<p>Nombre: " . $nombre . "</p>";
        echo "<p>Comentario: " . $comentario . "</p>";
    }
    // Prueba: $_POST["comentario"] = "<script>alert(1)</script> Buen producto";
    ?>
</body>
</html>
