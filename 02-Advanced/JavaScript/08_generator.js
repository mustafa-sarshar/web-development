// Create a custom iterable object
const obj_iterable = {
    [Symbol.iterator]: function() {
        let step = 0
        const iterator = {
            next: function() {
                step++
                if (step === 1) {
                    return { value: "Hello", done: false }
                } else if (step === 2) {
                    return { value: "World", done: false }
                }
                return { value: undefined, done:true }
            },
        }
        return iterator
    }
}

for (const word of obj_iterable) {
    console.log(word)
}

// Now use generator to create an iterator automatically
function normalFunction() {
    console.log("Hello")
    console.log("World")
}
normalFunction()

function* generatorFunction() {
    yield "Hello"
    yield "World"
}
generatorFunction()

const generatorObj = generatorFunction()
for (const item of generatorObj) {
    console.log(item)
}