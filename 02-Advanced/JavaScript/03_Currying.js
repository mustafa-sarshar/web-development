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