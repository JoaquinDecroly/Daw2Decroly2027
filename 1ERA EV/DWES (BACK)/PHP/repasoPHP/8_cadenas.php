<?php
// Guarda una frase de ejemplo en una variable de tipo string.
$frase = "Anita lava la tina";
// Quita espacios y pasa todo a minúsculas para comparar sin distinguir mayúsculas.
$limpia = strtolower(str_replace(" ", "", $frase));

// Escribe el título de la sección en el documento HTML.
echo "<h1>Cadenas</h1>";
// strlen devuelve la longitud de la cadena en bytes.
echo strlen($frase) . " caracteres<br>";
// str_word_count cuenta las palabras separadas por espacios.
echo str_word_count($frase) . " palabras<br>";
// strtoupper convierte las letras a mayúsculas.
echo strtoupper($frase) . "<br>";
// strrev invierte la cadena, carácter por carácter.
echo strrev($frase) . "<br>";
// Compara la frase normalizada con su versión invertida para detectar el palíndromo.
echo $limpia === strrev($limpia) ? "Es palíndromo" : "No es palíndromo";