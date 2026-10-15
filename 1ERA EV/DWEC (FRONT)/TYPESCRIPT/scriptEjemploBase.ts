let a:string = "hola"; //variable tipo texto
let b:number = 1; //variable tipo numero
let c:boolean = true; //variable tipo boolean (verdadero/falso)
let d = "hola"; //variable tipo texto (aplicado mediante inferencia de tipo (variable con resultado tipo texto
                                                                                            //--> variable tipo texto))
let e:any; //variable tipo any (permite todos los tipos de variables) (volvemos a js (LIBERTINAJE))
let f:undefined; //variable indefinidad (sin valor/valor opcional)
                    //diferente a null--> ausencia intencional valor

//UNA INTERFAZ ES COMO UN MOLDE QUE INDICA QUE DEBE DE CONTENER CADA COSA
interface Rol{ //interfaz rol
    tipo:string
}

interface Persona{ //interfaz Persona (id, nombre, apellido, correo, rol [interfaz])
    id:number,
    nombre:string,
    apellido:string,
    correo:string,
    isDeveloper:boolean,
    rol: Rol
}

let personaA: Persona[] = [{ //array tipo persona con rol
    id: 1,
    nombre: "A",
    apellido: "b",
    correo: "a.b@ElementInternals.es",
    isDeveloper: false,
    rol: { tipo: "CEO" }
}];

//////////////////////////
//1
function sumar(a1:number, a2:number):number{ //esto esta bien, pero se puede mejorar
    return a1 + a2;
}

//2
function sumar2 (a11:number, a22:number){ //infiere/deduce, que devuelve un número
    return a11 + a22;
}

//3
// function sumar3 (a111, a222):number{ //si no se declara el tipo de parámetro que se entrega, es de tipo "any"
// return a111 + a222;
// }

//4
function sumar4 (a1111:number, a2222:string){
    return (a1111 + a2222); //saldra el numero + String
}


//EJEMPLO USANDO TODO///
const personas: Persona[] = [ //array conjunto personas
  {
    id: 1,
    nombre: "Ana",
    apellido: "García",
    correo: "ana@correo.es",
    isDeveloper: true,
    rol: { tipo: "Frontend" }
  },
  {
    id: 2,
    nombre: "Luis",
    apellido: "Pérez",
    correo: "luis@correo.es",
    isDeveloper: false,
    rol: { tipo: "CEO" }
  }
];

function mostrarPersona(persona: Persona): void { //función de tipo void (NO devuelve nada)
  console.log(`Nombre: ${persona.nombre} ${persona.apellido}`);
  console.log(`Rol: ${persona.rol.tipo}`);
}

personas.forEach(mostrarPersona);//recorrer todas las personas (mostrando la información por cada persona
                                    //por cada persona, se llama a la función mostrarPersona, que muestra la información)

console.log(sumar(10, 5)); //imprimir texto (resultado suma 10 + 5 = 15)
