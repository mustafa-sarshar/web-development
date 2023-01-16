"use strict";
const func1 = () => {
    console.log("Hello World!!!");
};
let func2;
func2 = () => {
    console.log("Func2");
};
// Input Params
const func3 = (username, age) => {
    console.log(username, age);
};
func3("Musto", 34);
// Optional Input Params
const func4 = (username, age, kids) => {
    console.log(username, age, kids === null || kids === void 0 ? void 0 : kids.toString());
};
func4("Musto", 34);
func4("Musto", 34, ["Lucie", "Bob"]);
// Function with returned value
const func5 = (a, b) => {
    return a + b;
};
func5(10, 20);
//  Function Signature
// Signature 1
let greet;
greet = (name, greetingMsg) => {
    console.log(`Hi ${name}, ${greetingMsg}`);
};
greet("Musto", "Thanks for joining us!");
// Signature 2
let calc;
calc = (num1, num2, operation) => {
    if (operation === "ADD") {
        return num1 + num2;
    }
    else if (operation === "SUB") {
        return num1 - num2;
    }
    else {
        return "Invalid Operation";
    }
};
// Signature 3
let logDetails;
logDetails = (action) => {
    console.log(`Let's ${action.type} for ${action.amount} meters`);
};
logDetails({ type: "Run", amount: 100 });
