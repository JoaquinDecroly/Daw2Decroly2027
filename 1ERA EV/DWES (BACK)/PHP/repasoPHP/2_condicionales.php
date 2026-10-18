<?php
/*
 * Punto 3: condicionales
 *
 * if / elseif / else ejecuta bloques según condiciones.
 * && significa «y», || significa «o» y ! niega una condición.
 * % calcula el resto; un número divisible por 2 es par.
 * switch compara el valor con cada case; break evita continuar al caso siguiente.
 * switch (true) permite evaluar condiciones y rangos dentro de los case.
 * El operador ternario tiene la forma condición ? valorSiTrue : valorSiFalse.
 */

// Asigna un número para determinar si es par o impar.
$numero = 7;
// Si el resto al dividir entre 2 es cero, el número es par; si no, es impar.
echo ($numero % 2 == 0) ? "par" : "impar";
echo "<br>";

// Asigna el número del día que se quiere traducir.
$dia = 3;
// switch selecciona el case que coincide con el valor de $dia.
switch ($dia) {
    // Si $dia vale 1, imprime lunes y break sale del switch.
    case 1:
        echo "Lunes";
        break;
    // Si $dia vale 2, imprime martes y sale del switch.
    case 2:
        echo "Martes";
        break;
    // Si $dia vale 3, imprime miércoles y sale del switch.
    case 3:
        echo "Miércoles";
        break;
    // default se ejecuta cuando no coincide ningún case.
    default:
        echo "Del 1 al 7";
}
echo "<br>";

// Asigna una nota para convertirla en una calificación cualitativa.
$nota = 7;
// switch (true) permite que cada case compruebe una expresión booleana.
switch (true) {
    // Una nota inferior a 5 corresponde a suspenso.
    case $nota < 5:
        echo "Suspenso";
        break;
    // Una nota exactamente igual a 5 corresponde a suficiente.
    case $nota == 5:
        echo "Suficiente";
        break;
    // Una nota exactamente igual a 6 corresponde a bien.
    case $nota == 6:
        echo "Bien";
        break;
    // Como los casos anteriores no coincidieron, una nota hasta 8 es notable.
    case $nota <= 8:
        echo "Notable";
        break;
    // El resto de notas corresponde a sobresaliente.
    default:
        echo "Sobresaliente";
}