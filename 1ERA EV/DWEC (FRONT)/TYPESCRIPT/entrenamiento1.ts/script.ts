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