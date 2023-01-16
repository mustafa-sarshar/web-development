// Data Types
let username = "Musto";
let age = 20;
let flagAdmin = true;
let inputs = [1, 2, 3, 4, 5];
let obj = {
  username: username,
  age: age,
  flagAdmin: flagAdmin,
  inputs: [...inputs],
};
let mixedArr = [1, 2, "a", "b"];

// Explicit data types
let familyName: string;
let userAge: number;
let usernames: string[];
let mixedArray: (number | string | boolean)[] = []; // Always initialize an array with [] at very first.
let uid: number | string;
let objArr: object = {};

// Type Any
let anything: any;
anything = "string data";
anything = 1_000;
anything = true;

let arrOfAnything: any[] = [];

// Type Alias
type CustomType = string | number | boolean;
let customTypeVar: CustomType;
customTypeVar = "name";
customTypeVar = 100;
customTypeVar = true;
