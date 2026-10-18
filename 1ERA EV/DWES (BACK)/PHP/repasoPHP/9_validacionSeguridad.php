<?php
// Inicia la sesión antes de que el archivo produzca cualquier salida.
session_start();

/*
 * Punto 10: sanitizar, validar y proteger datos
 *
 * Sanitizar limpia o transforma un dato; validar comprueba que cumple el
 * formato esperado. Valida al recibir y escapa al imprimir con htmlspecialchars.
 * FILTER_SANITIZE_STRING está obsoleto desde PHP 8.1. addslashes no protege de
 * inyección SQL: para bases de datos se usan consultas preparadas.
 *
 * Sanitización y conversión:
 * - trim($s): quita espacios y saltos al principio y al final.
 * - htmlspecialchars($s, ENT_QUOTES, "UTF-8"): escapa caracteres HTML.
 * - strip_tags($s): elimina etiquetas HTML y PHP.
 * - FILTER_SANITIZE_FULL_SPECIAL_CHARS: sanitiza caracteres especiales HTML.
 * - FILTER_SANITIZE_EMAIL, FILTER_SANITIZE_NUMBER_INT y FILTER_SANITIZE_URL.
 * - intval($s) o (int) $s convierten a entero; floatval($s) convierte a decimal.
 *
 * Validación:
 * - FILTER_VALIDATE_EMAIL, FILTER_VALIDATE_INT, FILTER_VALIDATE_FLOAT y
 *   FILTER_VALIDATE_URL devuelven false cuando el valor no es válido.
 * - FILTER_VALIDATE_INT admite min_range y max_range en options.
 * - filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL) lee y valida.
 * - is_numeric, ctype_digit, ctype_alpha y preg_match permiten otras comprobaciones.
 * - strlen/mb_strlen cuentan caracteres; isset y empty comprueban existencia/vacío.
 *   Usar mb_strlen cuando se necesite contar caracteres Unicode.
 */

// Declara una función para recortar espacios y escapar caracteres especiales de HTML.
function limpiar($dato)
{
    // trim limpia los extremos y htmlspecialchars neutraliza etiquetas/atributos HTML.
    return htmlspecialchars(trim($dato), ENT_QUOTES, "UTF-8");
}

// Apartado 10.2: valida edad, email y URL recibidos por POST.
// filter_var comprueba que la edad sea un entero entre 1 y 120; devuelve false si falla.
$edad = filter_var(
    $_POST["edad"] ?? "",
    FILTER_VALIDATE_INT,
    ["options" => ["min_range" => 1, "max_range" => 120]]
);
// Valida el formato del email recibido; ?? proporciona una cadena si no llegó el campo.
$email = filter_var($_POST["email"] ?? "", FILTER_VALIDATE_EMAIL);
// Valida que el dato recibido tenga formato de URL.
$web = filter_var($_POST["web"] ?? "", FILTER_VALIDATE_URL);

// Ejecuta los mensajes de validación solo al recibir un envío POST.
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // El resultado false indica que la edad no pasó FILTER_VALIDATE_INT.
    if ($edad === false) {
        // Informa al usuario de que la edad no cumple el formato o el rango.
        echo "Edad no válida<br>";
    }
    // El resultado false indica que el email no pasó FILTER_VALIDATE_EMAIL.
    if ($email === false) {
        // Informa del email inválido.
        echo "Email no válido<br>";
    }
    // El resultado false indica que el dato no tiene formato de URL válido.
    if ($web === false) {
        // Informa de la URL inválida.
        echo "URL no válida<br>";
    }
}

// Apartado 10.2: ejemplo completo de sanitización y validación de un formulario.
// Evita acceder al formulario si no es POST o no llegó el campo nombre.
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["nombre"])) {
    // Limpia los espacios del nombre y escapa caracteres que podrían ser HTML.
    $nombre = limpiar($_POST["nombre"] ?? "");
    // Recorta el email y elimina caracteres que no son permitidos en una dirección.
    $emailLimpio = filter_var(
        trim($_POST["email"] ?? ""),
        FILTER_SANITIZE_EMAIL
    );
    // Valida la edad como entero dentro del rango permitido.
    $edadValidada = filter_var(
        $_POST["edad"] ?? "",
        FILTER_VALIDATE_INT,
        ["options" => ["min_range" => 1, "max_range" => 120]]
    );

    // Prepara una lista vacía donde se guardará cada problema encontrado.
    $errores = [];
    // La comparación estricta comprueba si el nombre es exactamente una cadena vacía.
    if ($nombre === "") {
        // Añade el error al array con [] sin reemplazar errores anteriores.
        $errores[] = "El nombre es obligatorio.";
    }
    // Sanitizar no sustituye a validar: aquí se comprueba el email ya saneado.
    if (!filter_var($emailLimpio, FILTER_VALIDATE_EMAIL)) {
        // Añade un error si el formato del email no es válido.
        $errores[] = "Email no válido.";
    }
    // filter_var devuelve false cuando la edad no es un entero válido del rango.
    if ($edadValidada === false) {
        // Añade la explicación del rango permitido.
        $errores[] = "La edad debe ser un entero entre 1 y 120.";
    }

    // Un array vacío significa que ninguna validación agregó errores.
    if ($errores === []) {
        // El nombre ya está escapado dentro de limpiar(), listo para salida HTML.
        echo "Hola " . $nombre . "<br>";
    // Si hay errores, se muestran todos en vez de detenerse en el primero.
    } else {
        // Recorre cada error acumulado.
        foreach ($errores as $error) {
            // Escapa cada texto antes de imprimirlo dentro del HTML.
            echo htmlspecialchars($error, ENT_QUOTES, "UTF-8") . "<br>";
        }
    }
}

/*
 * Apartado 10.3: contraseñas y base de datos.
 *
 * Registro: guardar password_hash($pass, PASSWORD_DEFAULT), nunca la contraseña
 * en claro. Login: password_verify($pass, $hashGuardado).
 *
 * Ejemplo de consulta PDO preparada (rellena la configuración para tu entorno):
 * $pdo = new PDO("mysql:host=localhost;dbname=demo;charset=utf8mb4", $usuarioDb, $passDb);
 * $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = :email");
 * $stmt->execute([":email" => $email]);
 * $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
 */

/*
 * Apartado 10.4: cadenas, arrays, fechas y matemáticas.
 *
 * Cadenas: str_contains, str_starts_with, str_ends_with (PHP 8), strpos (comparar
 * con !== false), substr_count, ucwords, lcfirst, mb_strtoupper, str_pad,
 * str_repeat, sprintf, number_format, nl2br, explode, implode, str_split, ltrim,
 * rtrim y strcmp.
 * Arrays: array_push, array_pop, array_shift, array_unshift, array_splice,
 * array_merge, array_slice, array_unique, array_reverse, array_combine, range,
 * in_array, array_search, array_key_exists, array_keys y array_column.
 * Ordenación: sort, rsort, asort, arsort, ksort, krsort y usort (con <=>).
 * Fechas: date, time, strtotime, checkdate, date_default_timezone_set y DateTime.
 * Matemáticas: pow / **, sqrt, intdiv, fmod, mt_rand / random_int, pi y round.
 * Constantes: define("IVA", 21) o const IVA = 21.
 */

// Ejemplo de ordenación de un array multidimensional por la nota, de mayor a menor.
$alumnos = [
    ["nombre" => "Ana", "nota" => 8],
    ["nombre" => "Luis", "nota" => 5],
    ["nombre" => "Eva", "nota" => 9],
];
// usort ordena el array usando el comparador; <=> compara las notas.
usort($alumnos, fn($a, $b) => $b["nota"] <=> $a["nota"]);
// array_column extrae todos los nombres y implode los une con comas.
echo implode(", ", array_column($alumnos, "nombre")) . "<br>";
// array_sum suma las notas extraídas y count devuelve la cantidad de alumnos.
$mediaAlumnos = array_sum(array_column($alumnos, "nota")) / count($alumnos);
// round deja la media con dos decimales y echo la muestra.
echo "Media: " . round($mediaAlumnos, 2) . "<br>";

/*
 * Apartado 10.5: sesiones, cookies, cabeceras y ficheros.
 *
 * Superglobales: $_GET, $_POST, $_REQUEST, $_SERVER, $_COOKIE, $_SESSION y $_FILES.
 * session_start() debe ejecutarse antes de enviar contenido.
 * Cookie de ejemplo: setcookie("tema", "oscuro", time() + 3600 * 24 * 30, "/").
 * Redirigir: header("Location: panel.php"); exit; (antes de cualquier salida).
 * Inclusiones: include, require, include_once y require_once.
 * Ficheros/JSON: file_get_contents, file_put_contents, file_exists, json_encode y json_decode.
 * Depuración: var_dump, print_r dentro de <pre>, die/exit, is_array, is_string,
 * is_null y unset.
 *
 * Para un login en archivos separados: login.php guarda el usuario en $_SESSION y
 * redirige; panel.php comprueba isset($_SESSION["usuario"]); logout.php ejecuta
 * session_destroy() y redirige al formulario de login.
 */

// Ejercicio 11: suma una visita cada vez que se carga esta página.
$_SESSION["visitas"] = ($_SESSION["visitas"] ?? 0) + 1;
// Imprime un título de salida para el ejemplo de sesión.
echo "<h1>Punto 10: validación, seguridad y sesiones</h1>";
// Muestra el contador que persiste entre peticiones gracias a $_SESSION.
echo "Has visitado esta página " . $_SESSION["visitas"] . " veces";