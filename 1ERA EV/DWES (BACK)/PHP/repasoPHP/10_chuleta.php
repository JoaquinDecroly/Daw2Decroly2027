<?php
/*
 * Tema 11: chuleta final
 *
 * Cadenas: strlen, strtoupper / strtolower, ucfirst, trim, str_replace, substr,
 * strpos, explode / implode, strrev y str_word_count.
 *
 * Arrays: count, array_sum, max / min, sort / rsort / asort / ksort, in_array,
 * array_push / [], array_filter, array_map, array_keys / array_values y array_search.
 *
 * Matemáticas: round, floor, ceil, abs, rand(1, 10) y number_format($n, 2, ",", ".").
 *
 * Formularios y seguridad: isset, empty, $_GET / $_POST,
 * $_SERVER["REQUEST_METHOD"], htmlspecialchars, filter_var, is_numeric.
 * Sanitizar/validar: trim, strip_tags, FILTER_SANITIZE_*, FILTER_VALIDATE_*,
 * filter_input, intval, preg_match, password_hash / password_verify y PDO prepare/execute.
 * Sesiones y otros: session_start, $_SESSION, setcookie, header("Location: ..."),
 * require_once, date, strtotime, usort y array_column.
 *
 * Errores que más puntos cuestan:
 * - Olvidar ; o . al concatenar.
 * - Usar una variable con un nombre distinto del que se declaró.
 * - Olvidar break en un switch o cerrar una llave.
 * - Crear bucles que nunca terminan porque no cambia la variable de control.
 * - Escribir comentarios // fuera de las etiquetas <?php ?>.
 * - No escapar con htmlspecialchars los datos que vienen del usuario.
 * - Confundir = (asignar) con == / === (comparar).
 */

// Imprime el encabezado de la página que contiene la chuleta.
echo "<h1>Chuleta final de PHP</h1>";
// Explica dónde consultar el resumen: en los comentarios de referencia de arriba.
echo "Consulta las categorías y funciones en los comentarios de este archivo.";