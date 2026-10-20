import { ErrorEdadIgual } from "./errorEdadIgual";
import { ErrorEdadNegativa } from "./errorEdadNegativa";
import { ErrorEdadNula } from "./errorEdadNula";
import { ErrorNombreIgual } from "./errorNombreIgual";

//----CALCULAR LETRA DNI----
let arrayLetrasDNI: string[] = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X',
'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

function calcularLetraDni(dni: string):string{
    let dni2:number = Number(dni);

    return arrayLetrasDNI[dni2 % 23];
}

//clase animal.ts (por lo general, sería en otro archivo, pero para hacerlo más visual lo haré aquí)
class Animal{
    protected edad:number = 0; //edad inicalizada en 0

    constructor(){ //cuando se construye el objeto se cambia la edad a 1
        this.edad = 1;
    }

    public getEdad(){ //funcion para obtener edad
        return this.edad;
    }

    public setEdad(edad:number){ //funcion para setear la edad
            if(edad > 1 && this.edad != 1){ //mayor a 1 (positivo y distinto a lo inicial)
               return this.edad = edad;

            }else if(edad == this.edad){ //si la edad insertada es igual a la existente
                throw new ErrorEdadIgual();
                
            }else if(edad < 0){ //si la edad es negativa
                throw new ErrorEdadNegativa();

            }else if(edad == 0){ //la edad es 0 (ampliación: se podría sugerir eliminar animal)
                throw new ErrorEdadNula();
            }
    }

    public toString(): string { //representar la edad
        return `Edad: ${this.edad}`;
    }  
} 
    const animal1 = new Animal(); //crear animal

//clase perro que herede de animal

class Perro extends Animal{
    private _nombre:string = "";

    constructor (){
        super();
        this._nombre;
    } 

    public getNombre(){
        return this._nombre;
    }

    public setNombre(nombre:string){
        if(this._nombre == nombre){
            throw new ErrorNombreIgual();

        }
        return this._nombre = nombre;
    }

    public toString(): string { //representar la edad
        return `Soy un perrito llamado  ${this._nombre} , con ${super.getEdad()} anios de edad`;
    }
}

    
    let nombre:string = "";

    while(nombre === ""){
        nombre = prompt("Como se llama tu criaturita canina?", "") ?? "";
    }
    
    const perro = new Perro();
    perro.setNombre(nombre);