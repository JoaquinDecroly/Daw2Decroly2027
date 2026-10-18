<?php
// Define credenciales fijas solo para demostrar el flujo; no usar así en producción.
$usuarioCorrecto = "user";
// Contraseña de ejemplo en texto plano; una aplicación real debe almacenar un hash.
$contrasenaCorrecta = "segura";
// Crea un array vacío para acumular todos los errores del formulario de contacto.
$erroresContacto = [];
// Inicializa el nombre para que exista incluso antes de enviar el formulario.
$nombre = "";
// Inicializa el mensaje por la misma razón y para evitar variables indefinidas.
$mensaje = "";

// Comprueba en el servidor si la petición actual se envió con el método POST.
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // El campo oculto identifica cuál de los dos formularios fue enviado.
    if (($_POST["formulario"] ?? "") === "login") {
        // Lee el usuario si existe y elimina espacios de ambos extremos.
        $usuario = trim($_POST["usuario"] ?? "");
        // Lee la contraseña; ?? evita avisos si el campo no llegó.
        $contrasena = $_POST["pass"] ?? "";

        // Compara usuario y valor esperado con comparación estricta.
        if ($usuario !== $usuarioCorrecto) {
            // Guarda el mensaje que se mostrará si el usuario no coincide.
            $mensajeLogin = "El usuario no coincide";
        // Solo se comprueba la contraseña cuando el usuario sí coincide.
        } elseif ($contrasena !== $contrasenaCorrecta) {
            // Guarda el error correspondiente a una contraseña incorrecta.
            $mensajeLogin = "La contraseña es incorrecta";
        // Si ninguna comparación falló, las credenciales coinciden.
        } else {
            // Escapa el usuario antes de insertarlo en la respuesta HTML.
            $mensajeLogin = "Bienvenido, " . htmlspecialchars($usuario, ENT_QUOTES, "UTF-8");
        }
    }

    // Comprueba si se envió el formulario de contacto.
    if (($_POST["formulario"] ?? "") === "contacto") {
        // Lee el nombre y quita espacios al principio y al final.
        $nombre = trim($_POST["nombre"] ?? "");
        // Lee y recorta el email para validarlo después.
        $email = trim($_POST["email"] ?? "");
        // Lee y recorta el mensaje para comprobar su longitud.
        $mensaje = trim($_POST["mensaje"] ?? "");

        // Comprueba que el nombre no esté vacío después de aplicar trim.
        if ($nombre === "") {
            // Añade el error al array sin borrar posibles errores anteriores.
            $erroresContacto[] = "Falta el nombre.";
        }
        // filter_var con FILTER_VALIDATE_EMAIL comprueba el formato del email.
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Añade el error de email inválido si falla la validación.
            $erroresContacto[] = "Email no válido.";
        }
        // strlen cuenta los bytes de la cadena; aquí se exige un mínimo de 10.
        if (strlen($mensaje) < 10) {
            // Añade el error si el mensaje no llega a la longitud requerida.
            $erroresContacto[] = "El mensaje debe tener al menos 10 caracteres.";
        }
    }
}
?>
<!-- Encabezado que introduce los ejemplos de formularios POST. -->
<h1>Formularios POST</h1>

<!-- Título del formulario de inicio de sesión. -->
<h2>Inicio de sesión de ejemplo</h2>
<!-- method=POST envía los campos en el cuerpo de la petición HTTP. -->
<form method="POST">
    <!-- Campo oculto para que PHP sepa que se envió el formulario login. -->
    <input type="hidden" name="formulario" value="login">
    <!-- Campo de texto; el atributo name determina la clave en $_POST. -->
    <label>Usuario: <input type="text" name="usuario"></label><br>
    <!-- Campo password oculta visualmente lo que se escribe. -->
    <label>Contraseña: <input type="password" name="pass"></label><br>
    <!-- Al pulsarlo, el navegador envía el formulario al servidor. -->
    <button type="submit">Entrar</button>
<!-- Cierra el formulario de inicio de sesión. -->
</form>
<!-- isset comprueba si PHP creó el mensaje tras procesar el login. -->
<?php if (isset($mensajeLogin)): ?>
    <!-- Imprime el resultado del login; el nombre ya fue escapado al crearlo. -->
    <p><?= $mensajeLogin ?></p>
<!-- Termina el if alternativo de sintaxis PHP para plantillas. -->
<?php endif; ?>

<!-- Título del formulario de contacto. -->
<h2>Formulario de contacto</h2>
<!-- Abre el formulario que enviará nombre, email y mensaje por POST. -->
<form method="POST">
    <!-- Identificador que diferencia este formulario del login. -->
    <input type="hidden" name="formulario" value="contacto">
    <!-- Campo donde la persona introduce su nombre. -->
    <label>Nombre: <input type="text" name="nombre"></label><br>
    <!-- Campo email que ofrece una validación básica en el navegador. -->
    <label>Email: <input type="email" name="email"></label><br>
    <!-- Área de texto para escribir el mensaje de contacto. -->
    <label>Mensaje: <textarea name="mensaje"></textarea></label><br>
    <!-- Envía el formulario al servidor para validar también allí los datos. -->
    <button type="submit">Enviar</button>
<!-- Cierra el formulario de contacto. -->
</form>
<!-- Solo muestra el resultado si el formulario enviado fue el de contacto. -->
<?php if (($_POST["formulario"] ?? "") === "contacto"): ?>
    <!-- Un array de errores vacío significa que todos los datos pasaron las comprobaciones. -->
    <?php if ($erroresContacto === []): ?>
        <!-- htmlspecialchars evita que el nombre se interprete como código HTML. -->
        <p>Gracias, <?= htmlspecialchars($nombre, ENT_QUOTES, "UTF-8") ?>.</p>
        <!-- También se escapa el mensaje antes de mostrarlo en la página. -->
        <p>Mensaje: <?= htmlspecialchars($mensaje, ENT_QUOTES, "UTF-8") ?></p>
    <!-- Si hay errores, se muestran en lugar de confirmar el envío. -->
    <?php else: ?>
        <!-- Recorre el array para mostrar todos los errores, no solo el primero. -->
        <?php foreach ($erroresContacto as $error): ?>
            <!-- Escapa el texto del error antes de imprimirlo en HTML. -->
            <p><?= htmlspecialchars($error, ENT_QUOTES, "UTF-8") ?></p>
        <!-- Termina el bucle que muestra los errores. -->
        <?php endforeach; ?>
    <!-- Termina la comprobación entre envío válido y envío con errores. -->
    <?php endif; ?>
<!-- Termina la comprobación del formulario enviado. -->
<?php endif; ?>