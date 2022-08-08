/*
Data types:
undefined, null, Boolean, String, Symbol, Number, Object
*/

var varUndefined = undefined;
var varNull = null;
var varBoolean = true;
var varString = "string";
var varSymbol = Symbol("A");
var varNumber = 123;
var varObject = new Object(undefined);

console.log(`Undefined: ${varUndefined} has type: ${typeof varUndefined}`);
console.log(`Null: ${varNull} has type: ${typeof varNull}`);
console.log(`Boolean: ${varBoolean} has type: ${typeof varBoolean}`);
console.log(`String: ${varString} has type: ${typeof varString}`);
// console.log(`Symbol: ${varSymbol} has type: ${typeof varSymbol}`); // Cannot convert a Symbol value to a string
console.log(`Number: ${varNumber} has type: ${typeof varNumber}`);
console.log(`Object: ${varObject} has type: ${typeof varObject}`);