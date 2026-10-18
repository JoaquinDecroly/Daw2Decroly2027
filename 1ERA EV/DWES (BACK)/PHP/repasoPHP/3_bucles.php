<?php
/*
 * Punto 4: bucles
 *
 * for se usa normalmente cuando se conoce el número de vueltas.
 * while comprueba la condición antes de cada vuelta; podría no ejecutarse nunca.
 * do-while comprueba al final y por eso se ejecuta al menos una vez.
 * foreach recorre arrays por valor o por clave y valor.
 * break termina un bucle; continue salta a la siguiente vuelta.
 * Hay que modificar la variable de control para evitar bucles infinitos.
 */

// Imprime el título del ejemplo de tablas de multiplicar.
echo "<h2>Tablas de multiplicar del 1 al 10</h2>";
// El bucle exterior elige qué tabla se está mostrando.
for ($i = 1; $i <= 10; $i++) {
    // Imprime el encabezado de la tabla actual.
    echo "<strong>Tabla del $i</strong><br>";
    // El bucle interior recorre los multiplicadores del 1 al 10.
    for ($j = 1; $j <= 10; $j++) {
        // Multiplica el número de la tabla por el multiplicador actual.
        echo "$i x $j = " . ($i * $j) . "<br>";
    }
}

// Anuncia el siguiente ejemplo.
echo "<h2>Números pares del 0 al 50</h2>";
// Empieza en cero y suma dos en cada vuelta para visitar solo números pares.
for ($i = 0; $i <= 50; $i += 2) {
    // Imprime el número par actual seguido de un espacio.
    echo $i . " ";
}
echo "<br>";

// Anuncia el ejemplo de cuenta atrás.
echo "<h2>Cuenta atrás</h2>";
// Inicializa el contador en diez.
$n = 10;
// do-while ejecuta el cuerpo antes de comprobar la condición.
do {
    // Imprime el valor actual del contador.
    echo $n . " ";
    // Reduce el contador para acercarlo a la condición de salida.
    $n--;
// Repite mientras el contador todavía sea mayor o igual que cero.
} while ($n >= 0);
echo "<br>";

// Anuncia el ejemplo de recorrido con foreach.
echo "<h2>Precios con IVA</h2>";
// Define una lista de precios; PHP asigna índices numéricos automáticamente.
$precios = [12.5, 8, 25.3, 4.99, 15];
// foreach recorre cada elemento y copia su valor en la variable $precio.
foreach ($precios as $precio) {
    // Calcula el precio con IVA multiplicando por 1.21 y redondea a dos decimales.
    echo $precio . " € → " . round($precio * 1.21, 2) . " €<br>";
}