<?php
// Declara una función que recibe un número y devuelve true si es primo.
function esPrimo($numero)
{
    // Los números menores que 2 no son primos.
    if ($numero < 2) {
        // Termina la función inmediatamente con el resultado false.
        return false;
    }

    // Prueba divisores desde 2 hasta la raíz cuadrada del número.
    for ($divisor = 2; $divisor * $divisor <= $numero; $divisor++) {
        // El operador módulo da el resto; resto cero significa división exacta.
        if ($numero % $divisor === 0) {
            // Si encuentra un divisor, el número no es primo.
            return false;
        }
    }

    // Si ningún divisor lo dividió exactamente, el número es primo.
    return true;
}

// Declara una función que calcula el factorial de un entero no negativo.
function factorial($numero)
{
    // El factorial de un número negativo no está definido en este ejemplo.
    if ($numero < 0) {
        // Devuelve null para indicar que no hay un resultado válido.
        return null;
    }

    // El factorial se obtiene multiplicando desde 1; esto también cubre 0! = 1.
    $resultado = 1;
    // Recorre los enteros desde 2 hasta el número recibido.
    for ($i = 2; $i <= $numero; $i++) {
        // Multiplica el acumulador por el valor actual del bucle.
        $resultado *= $i;
    }

    // Devuelve el producto calculado al lugar donde se llamó la función.
    return $resultado;
}

// Declara una función que devuelve un array con la cantidad indicada de términos Fibonacci.
function fibonacci($cantidad)
{
    // Empieza con una secuencia vacía a la que se añadirán los términos.
    $secuencia = [];
    // El índice empieza en cero y se repite hasta producir $cantidad elementos.
    for ($i = 0; $i < $cantidad; $i++) {
        // Los dos primeros términos son su índice; los siguientes suman los dos anteriores.
        $secuencia[] = $i < 2
            ? $i
            : $secuencia[$i - 1] + $secuencia[$i - 2];
    }

    // Devuelve el array completo de términos Fibonacci.
    return $secuencia;
}

// Imprime el título de la página.
echo "<h1>Funciones</h1>";
// Ejecuta esPrimo con 17 e imprime el booleano con su tipo usando var_dump.
var_dump(esPrimo(17));
// Calcula e imprime el factorial de 5; los br son saltos de línea HTML.
echo "<br>Factorial de 5: " . factorial(5) . "<br>";
// Genera ocho términos Fibonacci y los convierte en una cadena separada por comas.
echo "Fibonacci: " . implode(", ", fibonacci(8));