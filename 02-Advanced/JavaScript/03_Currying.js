// Example 1:

// Normal approach
function sum(a, b, c) {
    return a + b + c
}

const normalSum = sum(1, 5, 100)
console.log(normalSum)

// Currying
function curry(fn) {
    return function(a) {
        return function(b) {
            return function (c) {
                return fn(a, b, c)
            }
        }
    }
}

const curriedSum = curry(sum)
console.log(curriedSum(1)(5)(100))

// other implementation
const add_first = curriedSum(1)
const add_second = add_first(5)
const add_third = add_second(100)
console.log(add_third)

// Example 2:

// Sandwich builder
const buildSandwich = (ingredient1) => {
    return (ingredient2) => {
        return (ingredient3) => {
            return `${ingredient1} + ${ingredient2} + ${ingredient3}`
        }
    }
}
console.log(buildSandwich("Tofu")("Corn")("Bread"))

// Sandwich builder - another implementation
const buildSandwichArrow = ing1 => ing2 => ing3 => `${ing1} + ${ing2} + ${ing3}`

console.log(buildSandwichArrow("Tofu")("Corn")("Bread"))


// Example 3:

// Curried Multiply
const multiply = (a, b) => a * b
const curriedMultiply = a => b => a * b

console.log(multiply(10, 60))
console.log(curriedMultiply(10)(60))

// Example 4: Using Currying for function composition
const addCustomer = fn => (...args) => {
    console.log("Saving customer info ...");
    return fn(...args)
}
const processOrder = fn => (...args) => {
    console.log(`processing order #${args[0]}`);
    return fn(...args)
}
let completeOrder = (...args) => {
    console.log(`Order #${[...args].toString()} completed.`);
}

completeOrder = (processOrder(completeOrder))
completeOrder = (addCustomer(completeOrder))
completeOrder("1000")

console.log("\n");

// Another implementation
function addCustomer2(...args) {
    console.log("Saving customer info ... ");
    return function processOrder2 (...args) {
        console.log(`processing order #${args[0]}`);
        return function completeOrder2(...args) {
            console.log(`Order #${[...args].toString()} completed.`);
        }
    }
}

// Example 5: Currying a function with fixed number of input parameters

const curryMaker = (fn) => {
    console.log(`Curried maker -> fn.length: ${fn.length}`);
    return curried = (...args) => {        
        if (fn.length !== args.length) {
            console.log(`Curried maker -> fn.length: ${fn.length}, args.length: ${args.length}, args: ${args}`);
            return curried.bind(null, ...args)      // bind creates a new function
        }
        console.log(`Function curried -> fn.length: ${fn.length}, args.length: ${args.length}, args: ${args}`);
        return fn(...args)
    }
}
const calcTotal = (a, b, c) => a+b+c

const carriedCalcTotal = curryMaker(calcTotal)
console.log("The total is:", carriedCalcTotal(1)(19)(100));