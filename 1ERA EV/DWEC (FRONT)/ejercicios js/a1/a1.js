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