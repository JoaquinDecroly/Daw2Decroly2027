<?php
/*
 * Punto 2: variables, tipos y operadores
 *
 * Las variables empiezan por $ y PHP determina su tipo según el valor.
 * Los nombres distinguen mayúsculas: $Nombre y $nombre son variables distintas.
 * El punto (.) concatena texto; + suma números.
 * Tipos habituales: string, int, float, bool, array y null.
 * gettype() devuelve el tipo; var_dump() muestra valor y tipo.
 * == compara valores con conversiones; === compara valor y tipo.
 * Operadores: +, -, *, /, %, **, &&, ||, !, ?? y <=>.
 * Un entero fuera del rango disponible puede convertirse en float.
 */

// Guarda un texto en una variable de tipo string.
$nombre = "Juan";
// Guarda los apellidos en otra variable de tipo string.
$apellidos = "Pérez";
// Guarda un número entero en una variable int.
$edad = 20;

// Interpola variables dentro de comillas dobles y concatena la edad con el punto.
echo "Hola $nombre $apellidos, con edad: " . $edad . "<br>";

// Asigna dos números enteros para probar las operaciones aritméticas.
$a = 5;
$b = 10;
// El operador + suma los dos valores.
echo "Suma: " . ($a + $b) . "<br>";
// El operador - resta el segundo valor al primero.
echo "Resta: " . ($a - $b) . "<br>";
// El operador * multiplica los dos valores.
echo "Multiplicación: " . ($a * $b) . "<br>";
// El operador / divide los dos valores.
echo "División: " . ($a / $b) . "<br>";
// El operador % devuelve el resto de una división entera.
echo "Resto: " . ($b % $a) . "<br>";
// El operador ** eleva el primer número a la potencia del segundo.
echo "Potencia: " . ($a ** 2) . "<br>";

// gettype indica que el literal entre comillas es string.
echo gettype("Hola") . "<br>";
// gettype identifica el entero como integer.
echo gettype(1) . "<br>";
// En PHP, gettype suele llamar double al tipo que se conoce como float.
echo gettype(1.0) . "<br>";
// El valor false pertenece al tipo boolean.
echo gettype(false) . "<br>";
// var_dump muestra el valor y el tipo del array.
var_dump(["PHP", 8]);
echo "<br>";
// var_dump también muestra que null es un tipo propio.
var_dump(null);
echo "<br>";

// == compara valores aunque sus tipos sean distintos; aquí resulta true.
var_dump("8" == 8);
echo "<br>";
// === exige igualdad de valor y de tipo; string no es int, así que resulta false.
var_dump("8" === 8);
echo "<br>";

// ?? usa el valor de la derecha si la variable no existe o vale null.
$ciudad = $ciudad ?? "Bruselas";
// <=> devuelve -1, 0 o 1 según el primer valor sea menor, igual o mayor.
echo "Comparación con <=>: " . (3 <=> 5) . "<br>";

// Comprueba edad y carnet; && exige que las dos condiciones sean verdaderas.
$edad = 20;
$carnet = true;
// El operador ternario elige un texto dependiendo de la condición lógica.
echo ($edad >= 18 && $carnet) ? "Puedes conducir" : "No puedes conducir";
echo "<br>";

// Ejemplo resuelto: calcula la media de tres notas.
$n1 = 6;
$n2 = 3;
$n3 = 8;
// Suma las notas y divide entre tres para obtener la media.
$media = ($n1 + $n2 + $n3) / 3;
// Aprueba si la media llega a 5 y cada nota es al menos 4.
if ($media >= 5 && $n1 >= 4 && $n2 >= 4 && $n3 >= 4) {
    // Se ejecuta cuando todas las condiciones del if son verdaderas.
    echo "Aprobado";
} else {
    // Se ejecuta si la media o alguna nota no cumple el requisito.
    echo "Suspenso";
}