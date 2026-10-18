<?php
/*
 * Punto 5: arrays
 *
 * Un array indexado usa índices numéricos; un array asociativo usa claves con nombre.
 * Un array multidimensional contiene otros arrays, por ejemplo una lista de productos.
 * Se añaden valores con $array[] o array_push(), se cuentan con count() y se recorren
 * con foreach ($array as $clave => $valor).
 */

// Abre el bloque PHP, donde se ejecutará el código del ejemplo.
// Imprime un título HTML para identificar el tema en el navegador.
echo "<h1>Arrays</h1>";

// Crea un array indexado: sus elementos reciben los índices 0 y 1.
$productosIndexados = ["Leche", "Huevos"];
// Accede al primer elemento usando el índice numérico 0.
echo "Primer producto: " . $productosIndexados[0] . "<br>";

// Crea un array asociativo con claves de texto para describir un producto.
$productoAsociativo = ["nombre" => "Leche", "precio" => 1.50];
// Consulta un valor asociativo usando su clave, en lugar de un índice numérico.
echo "Precio: " . $productoAsociativo["precio"] . " €<br>";

// Añade otro elemento al final del array con la sintaxis de corchetes vacíos.
$productosIndexados[] = "Pan";
// count devuelve la cantidad de elementos que tiene el array.
echo "Productos en la lista: " . count($productosIndexados) . "<br>";

// Ejercicio 4: carrito con array multidimensional
// Cada elemento del array principal es otro array asociativo que representa un producto.
$carrito = [
    ["nombre" => "Leche", "precio" => 1.50, "cantidad" => 6], // Producto con nombre, precio y unidades.
    ["nombre" => "Huevos", "precio" => 3.20, "cantidad" => 2], // Segundo producto del carrito.
    ["nombre" => "Pan", "precio" => 1.10, "cantidad" => 3], // Tercer producto del carrito.
];

// Inicializa el acumulador que guardará la suma de todos los subtotales.
$subtotal = 0;
// Muestra un subtítulo antes de listar los productos.
echo "<h2>Carrito</h2>";
// Recorre cada producto; en cada vuelta, $producto contiene un array asociativo.
foreach ($carrito as $producto) {
    // Multiplica el precio por la cantidad para obtener el subtotal de esta línea.
    $linea = $producto["precio"] * $producto["cantidad"];
    // Concatena el nombre y el subtotal formateado con dos decimales.
    echo $producto["nombre"] . ": " . number_format($linea, 2) . " €<br>";
    // Suma el subtotal de este producto al total acumulado.
    $subtotal += $linea;
}

// Calcula el IVA aplicando el 21 % al subtotal.
$iva = $subtotal * 0.21;
// Muestra el importe antes de impuestos con dos decimales.
echo "Subtotal: " . number_format($subtotal, 2) . " €<br>";
// Muestra por separado el importe del IVA.
echo "IVA: " . number_format($iva, 2) . " €<br>";
// Suma base e IVA y muestra el total final.
echo "Total: " . number_format($subtotal + $iva, 2) . " €";

// Ejercicio 9: estadísticas de notas
// Guarda las notas en un array indexado, cuyos índices numéricos se crean automáticamente.
$notas = [7, 3, 9, 5, 10, 4];
// Calcula la media dividiendo la suma de las notas por la cantidad de elementos.
$media = array_sum($notas) / count($notas);
// Filtra las notas aprobadas; la función flecha devuelve true para notas de 5 o más.
$aprobadas = array_filter($notas, fn($nota) => $nota >= 5);

// Añade un título a la sección de resultados de las notas.
echo "<h2>Estadísticas de notas</h2>";
// Redondea la media a dos decimales y añade un salto de línea HTML.
echo "Media: " . round($media, 2) . "<br>";
// max y min devuelven respectivamente la nota mayor y la menor del array.
echo "Máxima: " . max($notas) . " · Mínima: " . min($notas) . "<br>";
// Cuenta cuántos elementos quedaron en el array filtrado de aprobadas.
echo "Aprobadas: " . count($aprobadas) . "<br>";

// Ordena el array original de mayor a menor; rsort también reorganiza sus índices.
rsort($notas);
// Une las notas ordenadas en un texto separado por comas.
echo "Notas ordenadas: " . implode(", ", $notas);