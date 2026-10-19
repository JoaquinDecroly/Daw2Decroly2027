"use strict";
// -------HELPER PARA OBTENER ELEMENTOS HTML TIPADOS----------
function obtener(id) {
    let obj = document.getElementById(id);
    if (!obj) {
        throw new Error(`No se encontró el elemento con id "${id}"`);
    }
    return obj;
}
//----MARCAR CAMPOS (VERDE/ROJO)-----
function marcarCampo(input, valido) {
    input.classList.remove("is-valid", "is-invalid");
    input.classList.add(valido ? "is-valid" : "is-invalid");
}
//-------FUNCIÓN AUXILIAR (OBTENER HORA)------
function hora() {
    const actual = new Date();
    const hh = actual.getHours();
    const mm = actual.getMinutes();
    const ss = actual.getSeconds();
    const dia = actual.getDate();
    const mes = actual.getMonth() + 1;
    return hh + " : " + mm + " : " + ss + "   " + dia + "/" + mes;
}
//----------BTN y P AL CARGAR DOM----------
let p = obtener("text");
let btn = obtener("btn");
document.addEventListener("DOMContentLoaded", () => {
    p.classList.remove("hidden");
    btn.classList.remove("hidden");
    setTimeout(() => {
        p.classList.add("hidden");
        btn.classList.add("hidden");
    }, 2000);
});
//--------FORMULARIO-----------
let nombre = obtener("nombre");
let edad = obtener("edad");
let email = obtener("email");
let telefono = obtener("telefono");
let checkbox = obtener("checkbox");
let btnForm = obtener("formularioBtn");
let formulario = obtener("formulario");
nombre.addEventListener("input", validarNombre);
edad.addEventListener("input", validarEdad);
email.addEventListener("input", validarEmail);
telefono.addEventListener("input", validarTelefono);
checkbox.addEventListener("change", validarCheck);
// ----------REGEX DE CADA CAMPO---------
// Nombre: 2-50 letras (con acentos y ñ), separadas por espacios simples
const regexNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,50}(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,50})*$/;
// Edad: entero de 1 a 99 (sin ceros a la izquierda)
const regexEdad = /^(?:[1-9]|[1-9]\d)$/;
// Email: usuario@dominio.ext (extensión de 2 o más letras)
const regexEmail = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
// Teléfono España: 9 dígitos que empiezan por 6, 7, 8 o 9, con prefijo opcional +34 / 0034
const regexTelefono = /^(?:\+34|0034)?[ ]?[6789]\d{8}$/;
function validarNombre() {
    if (regexNombre.test(nombre.value.trim())) {
        marcarCampo(nombre, true);
        return true;
    }
    else {
        marcarCampo(nombre, false);
        return false;
    }
}
function validarEdad() {
    if (regexEdad.test(edad.value.trim())) {
        marcarCampo(edad, true);
        return true;
    }
    else {
        marcarCampo(edad, false);
        return false;
    }
}
function validarEmail() {
    if (regexEmail.test(email.value.trim())) {
        marcarCampo(email, true);
        return true;
    }
    else {
        marcarCampo(email, false);
        return false;
    }
}
function validarTelefono() {
    if (regexTelefono.test(telefono.value.trim())) {
        marcarCampo(telefono, true);
        return true;
    }
    else {
        marcarCampo(telefono, false);
        return false;
    }
}
function validarCheck() {
    if (checkbox.checked) {
        marcarCampo(checkbox, true);
        return true;
    }
    else {
        marcarCampo(checkbox, false);
        return false;
    }
}
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const v1 = validarNombre();
    const v2 = validarEmail();
    const v3 = validarEdad();
    const v4 = validarTelefono();
    const v5 = validarCheck();
    if (v1 && v2 && v3 && v4 && v5) {
        alert("Formulario enviado, y en proceso de revisión! \n" + hora());
        btnForm.disabled = true;
    }
});
// Función asíncrona para obtener usuarios desde la API
async function fetchUsers() {
    try {
        // Hacemos la petición a la API
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        // Si la respuesta no es correcta, lanzamos un error
        if (!response.ok) {
            throw new Error(`HTTP error! ${response.status}`);
        }
        // Convertimos la respuesta JSON a un array de usuarios
        const data = await response.json();
        // Mostramos un mensaje de éxito
        alert(`Éxito: ${response.status}`);
        // Después de 1 segundo, mostramos otro mensaje
        setTimeout(() => {
            alert("Procesando...");
        }, 1000);
        // Después de 2 segundos, llamamos a la función que pinta los usuarios
        setTimeout(() => {
            displayUsers(data);
        }, 2000);
        // Devolvemos los datos para que la función pueda usarlos si hace falta
        return data;
    }
    catch (error) {
        // Si ocurre algún error, lo capturamos y mostramos el mensaje
        if (error instanceof Error) {
            console.log("Error: " + error.message);
            alert(`Error: ${error}`);
        }
        // En caso de error devolvemos un array vacío
        return [];
    }
}
// Función para mostrar los usuarios en el HTML
function displayUsers(users) {
    // Buscamos el contenedor donde vamos a pintar los usuarios
    const usersList = obtener("users-list");
    // Vaciar el contenido anterior antes de introducir nuevos datos
    usersList.replaceChildren();
    // Recorremos cada usuario del array
    users.forEach((user) => {
        // Creamos una tarjeta para cada usuario
        const card = document.createElement("article");
        card.className = "card";
        // Contenedor interno de la tarjeta
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        // Nombre del usuario
        const name = document.createElement("h3");
        name.className = "card-title h5";
        name.textContent = user.name;
        // Nombre de usuario
        const username = document.createElement("p");
        username.className = "card-text mb-1";
        username.textContent = `Usuario: ${user.username}`;
        // Email
        const email = document.createElement("p");
        email.className = "card-text mb-1";
        email.textContent = `Email: ${user.email}`;
        // Teléfono
        const phone = document.createElement("p");
        phone.className = "card-text mb-0";
        phone.textContent = `Teléfono: ${user.phone}`;
        // Página web
        const website = document.createElement("p");
        website.className = "card-text mb-0";
        website.textContent = `Web: ${user.website}`;
        // Añadimos todos los elementos dentro del body de la tarjeta
        cardBody.append(name, username, email, phone, website);
        // Añadimos el body dentro de la tarjeta
        card.append(cardBody);
        // Añadimos la tarjeta al contenedor principal
        usersList.append(card);
    });
}
