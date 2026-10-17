//-----------CALIFICACIÓN ALFABETONUMERICA--------------
let numString = prompt("Introduzca la nota (0-10):  ", "[0 (min)-10 (max): ]")?.trim; //pedir nota (por defecto texto), y .trim para quitar espacios

let numNumber:number = Number(numString); //obtenemos el numero

    while(numNumber < 0 && numNumber > 10 && numNumber != null){
                if (numNumber < 3) {
            console.log("Muy deficiente");
            
        } else if (numNumber < 5) {
        console.log("Insuficiente");

        } else if (numNumber < 6) {
            console.log("Suficiente");

        } else if (numNumber < 7) {
            console.log("Bien");

        } else if (numNumber < 9) {
            let not:string = "Notable";

                if(numNumber == 7){
                    console.log(not.concat(" bajo"));

                }else if(numNumber == 8){
                    console.log(not.concat(" alto"));
                    
                }
        } else {
            let sobre:string = "Sobresaliente";

                if(numNumber == 9){
                        console.log(sobre.concat(" bajo"));

                }else if(numNumber == 10){
                        console.log(sobre.concat(" alto"));

                }
        }
    }

//---------------HORA FUTURISTA------------------
let horaS = prompt("Digame la hora: ", "0");
let minutoS = prompt("Digame los minutos: ", "0");
let segundoS = prompt("Digame los segundos: ", "0");

let horaN = Number(horaS);
    while (!Number.isInteger(horaN) || horaN < 0 || horaN > 23) {
        horaS = prompt("Digame una hora valida (0-23): ", "0");
        horaN = Number(horaS);
    }

let minutoN = Number(minutoS);
    while (!Number.isInteger(minutoN) || minutoN < 0 || minutoN > 59) {
        minutoS = prompt("Digame unos minutos validos (0-59): ", "0");
        minutoN = Number(minutoS);
    }

let segundoN = Number(segundoS);
    while (!Number.isInteger(segundoN) || segundoN < 0 || segundoN > 59) {
        segundoS = prompt("Digame unos segundos validos (0-59): ", "0");
        segundoN = Number(segundoS);
    }

segundoN++;
    if (segundoN == 60) {
        segundoN = 0;
        minutoN++;
        if (minutoN == 60) {
            minutoN = 0;
            horaN = (horaN + 1) % 24;
        }
    }

console.log(`${String(horaN).padStart(2, "0")}:${String(minutoN).padStart(2, "0")}:${String(segundoN).padStart(2, "0")}`); //Se muestra la hora concatenada con comillas invertidas + padStart (permite decir la longitud del numero (00,01,02,03,04,05,06,07,08,09,10...))

//------------PIEDRA,PAPEL,TIJERA--------------
const opcionesJugadas: string[] = ["piedra", "papel", "tijera"];
    
    //----CONTADORES---
    let tijerasIA = 0;
    let papelIA = 0;
    let piedraIA = 0;

    let tijerasUSER = 0;
    let papelUSER = 0;
    let piedraUSER = 0;

    let contadorVUser = 0;
    let contadorVIA = 0;
    let contadorEmpates = 0;

    //-----PARTE ELECCIÓN ORDENADOR------
    const numAleatorioIA: number = Math.floor(Math.random() * 3) + 1;
    let arrayIA: string[] = [];

    switch (numAleatorioIA) {
        case 1:
            arrayIA.push(opcionesJugadas[0]);
            break;
        case 2:
            arrayIA.push(opcionesJugadas[1]);
            break;
        case 3:
            arrayIA.push(opcionesJugadas[2]);
            break;
    }

    //----PARTE ELECCIÓN USUARIO-----
    let numUser = prompt("Introduce 0, 1, 2 o 3:", "0");

    while (numUser !== null && numUser.trim() !== "" && !esNumeroOpcionValido(numUser)) { //numero usuario no es nulo, no es vació (un espacio) y no es númeero válido (entre 1 y 3)
        numUser = prompt("Introduce 0, 1, 2 o 3:", "0");
    }

    let numAleatorioUser: number;

    if (numUser === null || numUser.trim() === "" || numUser.trim() === "0") {
        numAleatorioUser = Math.floor(Math.random() * 3) + 1;

    } else {
        numAleatorioUser = Number(numUser);

    }

    let arrayUser: string[] = [];

    switch (numUser === "0" ? numAleatorioUser : Number(numUser)) {
        case 1:
            arrayUser.push(opcionesJugadas[0]);//USER--> piedra
            break;
        case 2:
            arrayUser.push(opcionesJugadas[1]);//USER--> papel
            break;
        case 3:
            arrayUser.push(opcionesJugadas[2]);//USER--> tijeras
            break;
    }


    //EXTRA (para si en un futuro se quiere hacer los resultados persistentes)
    type Decision = "USER" | "IA" | "EMPATE";
    const arrayDecision: Decision[] = [];

    //------DECISIÓN GANADOR-----
    if(arrayIA.includes(opcionesJugadas[0])){//IA --> piedra
        piedraIA++;

        if(arrayUser.includes(opcionesJugadas[0])){ //USER--> piedra
            arrayDecision.push("EMPATE");
            piedraUSER++;

        }else if(arrayUser.includes(opcionesJugadas[1])){//USER--> papel
            arrayDecision.push("USER");
            papelUSER++;

        }else{ //USER--> tijeras
            //arrayUser.includes(opcionesJugadas[2]) [si no es A o B, es C]
            arrayDecision.push("IA");
            tijerasUSER++;

        }

    } else if(arrayIA.includes(opcionesJugadas[1])){//IA --> papel
        papelIA++;

        if(arrayUser.includes(opcionesJugadas[0])){//USER--> piedra
            arrayDecision.push("IA");
            piedraUSER++;

        }else if(arrayUser.includes(opcionesJugadas[1])){//USER--> papel
            arrayDecision.push("EMPATE");
            papelUSER++;

        }else{ //USER--> tijeras
            //arrayUser.includes(opcionesJugadas[2]) [si no es A o B, es C]
            arrayDecision.push("USER");
            tijerasUSER++;

        }

    } else { //IA --> tijeras
        tijerasIA++;
        //arrayIA.includes(opcionesJugadas[2]) [si no es A o B, es C]
        if(arrayUser.includes(opcionesJugadas[0])){//USER--> piedra
            arrayDecision.push("USER");
            piedraUSER++;

        }else if(arrayUser.includes(opcionesJugadas[1])){//USER--> papel
            arrayDecision.push("IA");
            papelUSER++;

        }else{//USER--> tijeras
                //arrayUser.includes(opcionesJugadas[2]) [si no es A o B, es C]
            arrayDecision.push("EMPATE");
            tijerasUSER++;

        }
    }

//RECONTEO VICTORIAS Y/O EMPATES
    arrayDecision.forEach((decision) => {
        if (decision === "USER") {
            contadorVUser++;

        } else if (decision === "IA") {
            contadorVIA++;

        } else{
            contadorEmpates++;

        }
    });

    //-----función comprobacion número válido
    function esNumeroOpcionValido(valor: string): boolean {
        return /^[0-3]$/.test(valor.trim());
    }

//---------------ARRAY DE 100 NÚMERO (0-1)---------------------
let array:number[] = []; //array numerico

let contIgual = 0;
let contMayor = 0;

for (let i = 0; i < 100; i++) {
    array.push(Math.random()); //genera numero aleatorio entre 0-1, y lo mete en el array
}

let desc = prompt("¿Quiere saber cuantos numeros son iguales y/o superiores? Si, sí; deme un número", "-1"); //como respuesta por defecto le paso -1, ya que no va a coincidir con ninguno
let descN = Number(desc);

if(descN != (-1)){
    numerosIgualesSuperiores(descN); //Si es distinto a -1, le pasamos la función
}

function numerosIgualesSuperiores(num:number){
    if(num != (-1)){
        array.forEach((numero) => {
            if (numero == num) {
                contIgual++;

            } else if (numero > num) {
                contMayor++;

            }
        });

        console.log(`Numeros respecto a ${num}, iguales: ${contIgual} y superiores: ${contMayor}`);
    }
}

//--------------ARRAY DE 100 NUMEROS (0.0-10)-----------
let array2:number[] = []; //array numerico

let suma = 0;
let media = suma / array2.length;

// Creamos una copia para ordenar los numeros sin cambiar el array original.
let ordenados = [...array2].sort((a, b) => a - b);
// Calculamos la posicion central; los indices del array empiezan en 0.
let medio = Math.floor(ordenados.length / 2);

// Si hay una cantidad par, hacemos la media de los dos valores centrales;
// si es impar, la mediana es el valor que queda justo en el centro.
let mediana = ordenados.length % 2 === 0 ? (ordenados[medio - 1] + ordenados[medio]) / 2 : ordenados[medio]; //if tipo lambda ((x) ? [si es verdadero] y : [si es falso] z)

let minimo = Math.min(...array2); //hallar valor mínimo de copia array2
let maximo = Math.max(...array2); //hallar valor maximo de copia array2


    let numAS:string;
    let numAN:number;

    
    for (let j = 0; j < 100; j++) {
        numAS = (Math.random() * 10).toFixed(1); //genera numero aleatorio entre 0-1, con un decimal (toFixed(1))
        numAN = array2.push(Number(numAS)); //Se sube al array la conversión a número (numAN) del texto (numAS)
        suma += numAN;
    }
    
        let maxRepeticiones = 0;
        let numerosMasRepetidos:number[] = [];

        // Cada bucle compara un numero con todos los elementos del array.
        for (let i = 0; i < array2.length; i++) {
            let repeticiones = 0;

            for (let j = 0; j < array2.length; j++) {
                if (array2[i] === array2[j]) {
                    repeticiones++;

                }
            }

            if (repeticiones > maxRepeticiones) {
                maxRepeticiones = repeticiones;
                numerosMasRepetidos = [array2[i]];

            } else if (repeticiones === maxRepeticiones && !numerosMasRepetidos.includes(array2[i])) {
                numerosMasRepetidos.push(array2[i]);

            }
        }

    let desc1 = prompt("¿Quiere saber la suma, media, mediana, máximo, mínimo, y el valor más repetido? Si, sí; deme  un 0", "-1"); //como respuesta por defecto le paso -1, ya que no va a coincidir con ninguno
    let descN1 = Number(desc1);

    if(descN1 === 0){
        console.log(`Numero(s) mas repetido(s): ${numerosMasRepetidos.join(", ")}
            Repeticiones: ${maxRepeticiones}
            Suma: ${suma}
            Minimo: ${minimo}
            Maximo: ${maximo}
            Media: ${media}
            Mediana: ${mediana}`);
    }








