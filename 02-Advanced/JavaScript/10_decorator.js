// Example 1:
// Using closure to log how many times a function is called

// The main function. Note: Use let instead of const to be able to use the same name after decorating this function.
let sum = (...args) => {
    return [...args].reduce((acc, num) => acc + num)
}

const callCounter = (fn) => {
    let count = 0
    return (...args) => {
        console.log(`The function '${fn.name}' has been call ${count += 1} time(s).`)
        return fn(...args)
    }
}

// Decorate the function
sum = callCounter(sum)

console.log(sum(1, 2, 3))
console.log(sum(1, 2, 3, 4, 5, 6, 7))
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10))

console.log("\n");
// Example 2:
// Check for valid data and number of parameters
let rectangleArea = (height, width) => {
    return height*width;
}

// First decorator
const countParams = (fn) => {
    return (...params) => {
        if (params.length !== fn.length) {
            throw new Error(`Incorrect nummber of parameters for ${fn.name}`);
        }
        return fn(...params);
    }
}
// Second decorator
const checkInputTypeInteger = (fn) => {
    return (...params) => {
        params.forEach(param => {
            if (!Number.isInteger(param)) {
                throw new TypeError(`Params must be integers`);
            }
        })
        return fn(...params);
    }
}

rectangleArea = countParams(rectangleArea)
rectangleArea = checkInputTypeInteger(rectangleArea)

// console.log(rectangleArea(10))           // Causes an Error
// console.log(rectangleArea(10, "a"));     // Causes a TypeError
console.log("Sum:", rectangleArea(10, 20))