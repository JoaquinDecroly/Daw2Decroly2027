<?php
// Construye la ruta al JSON desde la carpeta actual de este archivo.
$rutaJson = __DIR__ . "/resources/users.json";
// Inicializa la lista de usuarios vacía por si el archivo no existe o no es válido.
$usuarios = [];
// Lee el filtro de ciudad desde GET y quita espacios exteriores.
$ciudad = trim($_GET["ciudad"] ?? "");

// is_file comprueba que la ruta existe y apunta a un archivo normal.
if (is_file($rutaJson)) {
    // Lee el archivo y convierte el JSON en arrays asociativos con el segundo argumento true.
    $datos = json_decode(file_get_contents($rutaJson), true);
    // Comprueba que la decodificación produjo un array antes de usarlo.
    if (is_array($datos)) {
        // Conserva los datos decodificados como lista de usuarios.
        $usuarios = $datos;
    }
}
?>
<!-- Título del ejercicio que trabaja lectura y filtrado de datos JSON. -->
<h1>JSON: usuarios filtrados por ciudad</h1>
<!-- GET añade el criterio de búsqueda a la URL. -->
<form method="GET">
    <!-- Etiqueta que relaciona el texto Ciudad con su campo de entrada. -->
    <label>Ciudad:
        <!-- El value conserva el filtro actual y se escapa para evitar inyección HTML. -->
        <input type="text" name="ciudad" value="<?= htmlspecialchars($ciudad, ENT_QUOTES, "UTF-8") ?>">
    <!-- Cierra la etiqueta que envuelve el campo de ciudad. -->
    </label>
    <!-- Envía la búsqueda como parámetro GET. -->
    <button type="submit">Filtrar</button>
<!-- Cierra el formulario de búsqueda. -->
</form>

<!-- Crea una tabla HTML con bordes para presentar los resultados. -->
<table border="1">
    <!-- Agrupa la fila de nombres de columna de la tabla. -->
    <thead>
        <!-- Define los encabezados ID, Nombre, Email y Ciudad. -->
        <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Ciudad</th></tr>
    <!-- Cierra la sección de encabezado de la tabla. -->
    </thead>
    <!-- Agrupa las filas de datos que se generan desde PHP. -->
    <tbody>
        <!-- Recorre la lista y asigna cada registro actual a $usuario. -->
        <?php foreach ($usuarios as $usuario): ?>
            <?php
            // Obtiene la ciudad anidada en address; ?? usa texto vacío si falta la clave.
            $ciudadUsuario = $usuario["address"]["city"] ?? "";
            // Si hay filtro y no aparece dentro de la ciudad, se omite esta iteración.
            if ($ciudad !== "" && stripos($ciudadUsuario, $ciudad) === false) {
                // continue salta al siguiente usuario del foreach.
                continue;
            }
            ?>
            <!-- Comienza una fila para el usuario que ha superado el filtro. -->
            <tr>
                <!-- Convierte el ID a string y lo escapa antes de insertarlo en HTML. -->
                <td><?= htmlspecialchars((string) ($usuario["id"] ?? ""), ENT_QUOTES, "UTF-8") ?></td>
                <!-- Muestra el nombre, usando texto vacío si no existe, y lo escapa. -->
                <td><?= htmlspecialchars($usuario["name"] ?? "", ENT_QUOTES, "UTF-8") ?></td>
                <!-- Muestra el email de forma segura y tolera que falte la clave. -->
                <td><?= htmlspecialchars($usuario["email"] ?? "", ENT_QUOTES, "UTF-8") ?></td>
                <!-- Muestra la ciudad filtrable después de escapar sus caracteres HTML. -->
                <td><?= htmlspecialchars($ciudadUsuario, ENT_QUOTES, "UTF-8") ?></td>
            <!-- Cierra la fila del usuario. -->
            </tr>
        <!-- Continúa hasta procesar todos los usuarios. -->
        <?php endforeach; ?>
    <!-- Cierra el cuerpo de la tabla. -->
    </tbody>
<!-- Cierra la tabla de resultados. -->
</table>