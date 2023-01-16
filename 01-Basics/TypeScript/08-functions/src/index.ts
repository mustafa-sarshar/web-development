const func1 = () => {
  console.log("Hello World!!!");
};

let func2: Function;
func2 = () => {
  console.log("Func2");
};

// Input Params
const func3 = (username: string, age: number) => {
  console.log(username, age);
};
func3("Musto", 34);

// Optional Input Params
const func4 = (username: string, age: number, kids?: string[]) => {
  console.log(username, age, kids?.toString());
};
func4("Musto", 34);
func4("Musto", 34, ["Lucie", "Bob"]);

// Function with returned value
const func5 = (a: number, b: number): number => {
  return a + b;
};
func5(10, 20);

//  Function Signature
// Signature 1
let greet: (a: string, b: string) => void;
greet = (name: string, greetingMsg: string) => {
  console.log(`Hi ${name}, ${greetingMsg}`);
};
greet("Musto", "Thanks for joining us!");

// Signature 2
let calc: (x: number, y: number, a: string) => number | string;
calc = (num1: number, num2: number, operation: string) => {
  if (operation === "ADD") {
    return num1 + num2;
  } else if (operation === "SUB") {
    return num1 - num2;
  } else {
    return "Invalid Operation";
  }
};

// Signature 3
let logDetails: (obj: { type: string; amount: number }) => void;
logDetails = (action: { type: string; amount: number }) => {
  console.log(`Let's ${action.type} for ${action.amount} meters`);
};
logDetails({ type: "Run", amount: 100 });
