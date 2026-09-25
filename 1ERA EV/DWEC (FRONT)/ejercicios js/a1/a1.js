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

document.getElementById("calcular").addEventListener("click", () => {
    const notaNumero = parseFloat(document.getElementById("nota").value);
    const resultado = document.getElementById("resultado");

    if (notaNumero < 0 || notaNumero > 10 || Number.isNaN(notaNumero)) {
        resultado.textContent = "Nota no válida";

    } else if (notaNumero < 3) {
        resultado.textContent = "Muy deficiente";

    }else if(notaNumero == 5){
        resultado.textContent = "Suficiente";
    
    } else if (notaNumero < 5) {
        resultado.textContent = "Insuficiente";

    } else if (notaNumero < 6) {
        resultado.textContent = "Bien";

    } else if (notaNumero < 9) {
        resultado.textContent = "Notable";

    } else {
        resultado.textContent = "Sobresaliente";
        
    }
});