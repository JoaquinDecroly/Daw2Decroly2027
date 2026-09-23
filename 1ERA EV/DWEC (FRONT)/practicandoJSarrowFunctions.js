function sumaPrueba(a, b){
    return console.log(a + b);
}

sumaPrueba(true, true);
sumaPrueba(true, -true);

console.log(true)

console.log(false)

sumaPrueba(undefined, undefined);

let array1 = [1,2,3,4,5,6,7,8,9,10]
const a = array1.filter(num => (num %2)===0)

console.log(a)

const b = array1.map(num => (num %2) *2)
console.log(b)

const c = array1.findIndex(num => (num % 0)=== 0)
console.log(c)

const d = array1.flat(num => num)
console.log(d)

const e = array1.copyWithin(num => (num % 0)=== 0)
console.log(e)

