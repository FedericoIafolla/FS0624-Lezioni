let myName = "federico";
console.log(myName);

myName = "Rossi";
console.log(myName);

const myLastName = "iafolla";
console.log(myLastName);

try {
  myLastName = "verdi";
} catch (error) {
  console.error("Errore: non è possibile riassegnare un valore ad una variabile dichiarata con const");
  console.error(error);
}


let x = 12;
let risultato = 4 - x;
console.log("Risultato della sottrazione: " + risultato);

//* ultima domanda //

/*
let name1 = "john"
let name2 = "john"

if (name1 !== name2) {
  console.log("name1 è diverso da name2")
} else {
  console.log("name1 è uguale a name2");
}

if (name1.toLowerCase() === name2.toLowerCase()) {
  console.log("name1 è uguale a name2 se entrambi sono trasformati in lowercase");
} else {
  console.log("name1 e name2 non sono uguali anche se entrambi sono trasformati in lowercase");
}

*/


let name1 = "John"
let name2 = "john"
const verify = name1 !== name2 ?
  console log.();
console.log(verify);

name1 = name1.toLocaleLowerCase
name2 = name2.toLocaleLowerCase

const verify2 = name1 !== name2 ?
  console.log();
console.log(verify2)