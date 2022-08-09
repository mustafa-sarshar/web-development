let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Old style without iterator
for (let i=0; i<arr.length; i++) {
    console.log(`The item No. ${i+1} is ${arr[i]}`)
}

// New Style using iterator
for (const num of arr) {
    console.log(`The current item is ${num}`)
}

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