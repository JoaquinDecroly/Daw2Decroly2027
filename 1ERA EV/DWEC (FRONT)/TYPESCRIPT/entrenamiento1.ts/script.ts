//Calificación alfabetonumerica
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
                    " alto";
                    
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

//hora futurista (hora + 1seg)
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

//piedra, papel, tijera
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
