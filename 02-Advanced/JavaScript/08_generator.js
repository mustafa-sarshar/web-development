// Now use generator to create an iterator automatically
function normalFunction() {
    console.log("Hello2")
    console.log("World2")
}
normalFunction()

function* generatorFunction() {
    yield "Hello3"
    yield "World3"
}
generatorFunction()

const generatorObj1 = generatorFunction()
for (const item of generatorObj1) {
    console.log("generatorObj1:", item)
}
console.log("generatorObj1:", generatorObj1.next())    // Nothing left

const generatorObj2 = generatorFunction()
console.log("generatorObj2", generatorObj2.next().value);
console.log("generatorObj2", generatorObj2.next().value);
console.log("generatorObj2", generatorObj2.next());    // Nothing left

// Implementation of Python's range() in JavaScript         Source: https://stackoverflow.com/questions/8273047/javascript-function-similar-to-python-range
function* range(start, stop, step=1) {
    if (!stop) {
        // one param defined
        stop = start;
        start = 0;
    }
    for (let i=start; step>0 ? i<stop : i>stop; i += step) yield i;
}

console.log("\nrange(5):");
for (let idx of range(5)) {
    console.log("Current index:", idx);
}

console.log("\nrange(10, 15):");
for (const idx of range(10, 15)) {
    console.log("Current index:", idx);
}

console.log("\nrange(28, 12, -2):");
for (const idx of range(28, 12, -2)) {
    console.log("Current index:", idx);
}