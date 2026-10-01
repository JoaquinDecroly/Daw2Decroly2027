// -----------EJEMPLO PARA REPRESENTARLO DIRECTAMENTE EN LA TERMINAL----------
// const readline = require("readline");

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question("Escriba una nota entre 0 y 10: ", (respuesta) => {
//     const notaNumero = parseFloat(respuesta);

//     if (notaNumero < 0 || notaNumero > 10 || Number.isNaN(notaNumero)) {
//         console.log("Nota no válida");
//     } else if (notaNumero < 3) {
//         console.log("Muy deficiente");
//     } else if (notaNumero < 5) {
//         console.log("Insuficiente");
//     } else if (notaNumero < 6) {
//         console.log("Bien");
//     } else if (notaNumero < 9) {
//         console.log("Notable");
//     } else {
//         console.log("Sobresaliente");
//     }

//     rl.close();
// });

// -------------NOTAS----------------
document.getElementById("form-nota").addEventListener("submit", (evento) => {
    evento.preventDefault();

    const notaNumero = parseFloat(document.getElementById("nota").value);
    const resultado = document.getElementById("resultado");

    if (notaNumero < 3) {
        resultado.textContent = "Muy deficiente";
    } else if (notaNumero < 5) {
        resultado.textContent = "Insuficiente";
    } else if (notaNumero < 6) {
        resultado.textContent = "Suficiente";
    } else if (notaNumero < 7) {
        resultado.textContent = "Bien";
    } else if (notaNumero < 9) {
        resultado.textContent = "Notable";

            if(notaNumero == 7){
                resultado.textContent += " bajo";
            }else if(notaNumero == 8){
                resultado.textContent += " alto";
                
            }
    } else {
        resultado.textContent = "Sobresaliente";
            if(notaNumero == 9){
                    resultado.textContent += " bajo";
            }else if(notaNumero == 10){
                    resultado.textContent += " alto";
            }
    }
});

// ---------------HORA PERSONALIZADO-----------
document.addEventListener("DOMContentLoaded", () => {
    const horaText = document.getElementById("hora-text");
    const horaInput = document.getElementById("hora");
    const minutoInput = document.getElementById("minuto");
    const segundoInput = document.getElementById("segundo");

    const formatear = (valor) => String(valor).padStart(2, "0");

    const actualizarHora = () => {
        let hora = Number(horaInput.value) || 0;
        let minuto = Number(minutoInput.value) || 0;
        let segundo = Number(segundoInput.value) || 0;

        if (hora > 23) hora = 23;
        if (minuto > 59) minuto = 59;
        if (segundo > 59) segundo = 59;

        if (hora < 0) hora = 0;
        if (minuto < 0) minuto = 0;
        if (segundo < 0) segundo = 0;

        if (hora === 23 && minuto === 59 && segundo === 59) {
            hora = 0;
            minuto = 0;
            segundo = 0;
        } else {
            segundo = segundo + 1;

            if (segundo > 59) {
                segundo = 0;
                minuto = minuto + 1;
            }

            if (minuto > 59) {
                minuto = 0;
                hora = hora + 1;
            }

            if (hora > 23) {
                hora = 0;
            }
        }

        horaInput.value = hora;
        minutoInput.value = minuto;
        segundoInput.value = segundo;

        const horaFormateada = `${formatear(hora)} : ${formatear(minuto)} : ${formatear(segundo)}`;
        horaText.textContent = horaFormateada;

        const datos = { hora, minuto, segundo };
        localStorage.setItem("hora-personalizada", JSON.stringify(datos));
    };

    const datosGuardados = localStorage.getItem("hora-personalizada");

    if (datosGuardados !== null) {
        try {
            const datos = JSON.parse(datosGuardados);
            horaInput.value = datos.hora;
            minutoInput.value = datos.minuto;
            segundoInput.value = datos.segundo;
        } catch (error) {
            console.warn("No se pudo leer la hora guardada:", error);
        }
    }

    horaText.addEventListener("dblclick", () => {
        actualizarHora();
    });

    [horaInput, minutoInput, segundoInput].forEach((input) => {
        input.addEventListener("input", actualizarHora);
    });

    actualizarHora();
});

// ----------------PIEDRA, PAPEL, TIJERA-----------
const piedraBtn = document.getElementById("piedra");
const papelBtn = document.getElementById("papel");
const tijerasBtn = document.getElementById("tijeras");

// puntos
const j1Points = document.getElementById("j1Points");
const iaPoints = document.getElementById("iaPoints");
const eliminarPuntos = document.getElementById("eliminarPuntuacion");

const gifContainer = document.getElementById("gif");

const puntosGuardados = JSON.parse(localStorage.getItem("puntos-ppt") ?? "null");
let puntosJugador = Number(puntosGuardados?.jugador) || 0;
let puntosIA = Number(puntosGuardados?.ia) || 0;
let eleccionJugador = "";
let eleccionAI = "";

function guardarPuntos() {
    j1Points.textContent = puntosJugador;
    iaPoints.textContent = puntosIA;
    eliminarPuntos.disabled = (puntosJugador === 0 && puntosIA === 0);

    localStorage.setItem("puntos-ppt", JSON.stringify({
        jugador: puntosJugador,
        ia: puntosIA
    }));
}

function mostrarGif(nombre, quitarDespues = true) {
    gifContainer.replaceChildren();

    const imagen = document.createElement("img");
    imagen.className = "img-fluid rounded mt-3";
    imagen.src = `resources/img/${nombre}`;
    imagen.alt = "Resultado de la partida";

    gifContainer.appendChild(imagen);

    imagen.addEventListener("load", () => {
        requestAnimationFrame(() => {
            imagen.classList.add("visible");
        });
    });

    if (quitarDespues) {
        setTimeout(() => {
            imagen.classList.remove("visible");
            setTimeout(() => {
                imagen.remove();
            }, 500);
        }, 3000);
    }

}

function eleccionIA() {
    const opcionIA = Math.floor(Math.random() * 3) + 1;

    switch (opcionIA) {
        case 1:
            eleccionAI = "Piedra";
            break;
        case 2:
            eleccionAI = "Papel";
            break;
        case 3:
            eleccionAI = "Tijera";
            break;
    }
}

function decidirGanador() {
    if (eleccionJugador === "Piedra") {
        if (eleccionAI === "Piedra") {
            console.log("Empate con la IA. No hay punto para nadie");
            mostrarGif("piedra-piedra.gif");
        } else if (eleccionAI === "Papel") {
            console.log("Perdiste, gano la IA. +1 punto para la IA");
            puntosIA++;
            mostrarGif("piedra-papel.gif");
        } else {
            console.log("Ganaste a la IA. +1 punto para el jugador");
            puntosJugador++;
            mostrarGif("tijera-piedra.gif");
        }
    } else if (eleccionJugador === "Papel") {
        if (eleccionAI === "Piedra") {
            console.log("Ganaste a la IA. +1 punto para el jugador");
            puntosJugador++;
            mostrarGif("piedra-papel.gif");
        } else if (eleccionAI === "Papel") {
            console.log("Empate con la IA. No hay punto para nadie");
            mostrarGif("papel-papel.gif");
        } else {
            console.log("Perdiste, gano la IA. +1 punto para la IA");
            puntosIA++;
            mostrarGif("tijera-papel.gif");
        }
    } else {
        if (eleccionAI === "Piedra") {
            console.log("Perdiste, gano la IA. +1 punto para la IA");
            puntosIA++;
            mostrarGif("tijera-piedra.gif");
        } else if (eleccionAI === "Papel") {
            console.log("Ganaste a la IA. +1 punto para el jugador");
            puntosJugador++;
            mostrarGif("tijera-papel.gif");
        } else {
            console.log("Empate con la IA. No hay punto para nadie");
            mostrarGif("tijera-tijera.gif");
        }
    }

    guardarPuntos();
}

const gifSuspense = "suspense-ruleta-rusa.gif";

function jugarConSuspense(eleccion) {
    eleccionJugador = eleccion;
    eleccionIA();
    mostrarGif(gifSuspense, false);

    setTimeout(() => {
        const gifActual = gifContainer.querySelector("img");

        if (gifActual) {
            gifActual.classList.remove("visible");
            setTimeout(() => {
                gifActual.remove();
                decidirGanador();
            }, 600);
        } else {
            decidirGanador();
        }
    }, 3000);
}

// EVENTOS
piedraBtn.addEventListener("click", () => {
    jugarConSuspense("Piedra");
});

papelBtn.addEventListener("click", () => {
    jugarConSuspense("Papel");
});

tijerasBtn.addEventListener("click", () => {
    jugarConSuspense("Tijera");
});


// eliminar puntos
eliminarPuntos.disabled = puntosJugador === 0 && puntosIA === 0;

eliminarPuntos.addEventListener("click", () => {
    localStorage.removeItem("puntos-ppt");

    puntosJugador = 0;
    puntosIA = 0;

    j1Points.textContent = 0;
    iaPoints.textContent = 0;
    eliminarPuntos.disabled = true;
});

guardarPuntos();

// ---------ARRAY 100 NÚMEROS REALES (0.0-1.0)---------
const array1 = [];

for (let index = 0; index < 100; index++) {
    array1.push(Math.random().toFixed(2));
}


document.getElementById("array11").addEventListener("click", () => {
    alert(array1.join() + " ");
});

// -----------ARRAY 100 NÚMEROS REALES (0.0-10.0)----------
const array2 = [];

for (let index = 0; index < 100; index++) {
    array2.push(Math.random().toFixed(2) * 10);
}


document.getElementById("array22").addEventListener("click", () => {
    alert(array2.join() + " ");
});

