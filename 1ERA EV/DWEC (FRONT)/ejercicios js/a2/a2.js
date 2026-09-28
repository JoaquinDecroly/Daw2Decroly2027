// -------BTN Y PÁRRAFO AL CARGAR DOM----------

const p = document.getElementById("text");
const btn = document.getElementById("btn");

document.addEventListener("DOMContentLoaded", () => {
    p.classList.remove("hidden");
    btn.classList.remove("hidden");

    setTimeout(() => {
        p.classList.add("hidden");
        btn.classList.add("hidden");
    }, 2000);
});

// ----------FORMULARIO---------
const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const  email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const checkBox = document.getElementById("checkbox");

const btnForm = document.getElementById("formularioBtn");



nombre.addEventListener("input", validarNombre);
edad.addEventListener("input", validarEdad);
email.addEventListener("input", validarEmail);
telefono.addEventListener("input", validarTelefono);
checkBox.addEventListener("change", validarCheck);

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
    if(regexNombre.test(nombre.value.trim())){
       marcarCampo(nombre, true);
       return true;
    }else{
        marcarCampo(nombre, false);
        return false;
    }
}

function validarEdad() {
    if(regexEdad.test(edad.value.trim())){
        marcarCampo(edad, true);
        return true;
    }else{
        marcarCampo(edad, false);
        return false;
    }
}

function validarEmail() {
    if(regexEmail.test(email.value.trim())){
        marcarCampo(email, true);
        return true;
    }else{
        marcarCampo(email, false);
        return false;
    }
    
}

function validarTelefono() {
    if(regexTelefono.test(telefono.value.trim())){
        marcarCampo(telefono, true);
        return true;
    }else{
        marcarCampo(telefono, false);
        return false;
    }
    
}

function validarCheck(){
    if(checkBox.checked){
        marcarCampo(checkBox, true);
        return true;
    }else{
        marcarCampo(checkBox, false);
        return false;
    }
}

function marcarCampo(input, valido) { //marcar campos, verde/rojo
    input.classList.remove("is-valid", "is-invalid");
    input.classList.add(valido ? "is-valid" : "is-invalid");
}

// auxiliar (hora actual)
function hora(){
    const actual = new Date();

    const hh = actual.getHours();
    const mm = actual.getMinutes();
    const ss = actual.getSeconds();

    const dia = actual.getDate();
    const mes = actual.getMonth()+1;
    
    return hh + " : " + mm + " : " + ss + "   " + dia + "/" + mes;
}


document.getElementById("formulario").addEventListener("submit", (evento) => {
    evento.preventDefault();

                let v1 = validarNombre();
                let v2 = validarEmail();
                let v3 = validarEdad();
                let v4 = validarTelefono();
                let v5 = validarCheck();

        if (v1 && v2 && v3 && v4 && v5) {
            alert("Formulario enviado, y en proceso de revisión! \n" + hora())
            btnForm.disabled = true;
            
        }
});

// --------CONEXION A API REST-----------
async function fetchUsers() {
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if(!response.ok){
            throw new Error(`HTTP error! ${response.status}`)
        }
        const data = await response.json();

        if(data != null){
            alert(`Exito: ${response.status}`);

            setTimeout(() => {
                alert("Procesando...")
            }, 1000);

            setTimeout(() => {
                displayUsers(data);
            }, 2000);
            
        }

        setTimeout(() => {
            return data;
        }, 5000);
        
    }catch(error){
        console.error("Error: ", error);
        alert(`Error: ${error}`);
    }
}

function displayUsers(users){
    const usersList = document.getElementById("users-list");
    usersList.replaceChildren();

    users.forEach((user) => {
        const card = document.createElement("article");
        card.className = "card";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const name = document.createElement("h3");
        name.className = "card-title h5";
        name.textContent = user.name;

        const username = document.createElement("p");
        username.className = "card-text mb-1";
        username.textContent = `Usuario: ${user.username}`;

        const email = document.createElement("p");
        email.className = "card-text mb-1";
        email.textContent = `Email: ${user.email}`;

        const phone = document.createElement("p");
        phone.className = "card-text mb-0";
        phone.textContent = `Teléfono: ${user.phone}`;

        const website = document.createElement("p");
        website.className = "card-text mb-0";
        website.textContent = `Web: ${user.website}`;

        cardBody.append(name, username, email, phone, website);
        card.append(cardBody);
        usersList.append(card);
    });
}





































// const puntosGuardados = JSON.parse(localStorage.getItem("puntos-ppt") ?? "null");

// function guardarPuntos() {
//     j1Points.textContent = puntosJugador;
//     iaPoints.textContent = puntosIA;
//     eliminarPuntos.disabled = (puntosJugador === 0 && puntosIA === 0);

//     localStorage.setItem("puntos-ppt", JSON.stringify({
//         jugador: puntosJugador,
//         ia: puntosIA
//     }));
// }


// guardarPuntos();
