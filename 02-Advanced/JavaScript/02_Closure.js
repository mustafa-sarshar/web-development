// Example 1
function outer() {
    let counter = 0
    function inner() {
        counter++
        console.log(counter);
    }
    return inner
}

const fn = outer()
fn()
fn()
fn()

console.log("\n")
// Example 2

let x = 1       // Global scope
function fn_parent() {
    // Local scope
    let counter = 0
    console.log("Local scope: x = " + x)
    console.log("Local scope: counter = " + counter)

    const increment = () => {
        x += 10
        counter++
        console.log("x increased to: " + x)
        console.log("Counter increased to: " + counter)
    }
    return increment
}

const mainFunc = fn_parent
const closure = mainFunc()
for (let i=0; i<3; i++) {
    console.log("Increment round " + (i+1))
    closure()
}

console.log("\n")
// IIFE (Immediately Invoked Function Exrpression)
const privateCounter = (() => {
    let count = 0
    console.log(`Initial value: ${count}`)
    
    return () => {
        count += 1
        console.log("Counter increased to: ", count)
    }
})()

for (let i=0; i<3; i++) {
    console.log("Increment round " + (i+1))
    privateCounter()
}


console.log("\n")
const takeCredits = ((creditPoints) => {
    let credits = creditPoints
    console.log(`Initial credit points: ${credits}`)

    return () => {
        if (credits > 1) {
            credits -= 1
            console.log(`Current credit points: ${credits}`)
        } else {
            console.log(`No credits left!!!`)
        }
    }
})(3)

takeCredits()
takeCredits()
takeCredits()