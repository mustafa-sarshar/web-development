// Example 1: Fibonatcci
let num = 10

// Without Recursion
const fib_withoutRecursion = (num, array=[0, 1]) => {
    // if (num === 0) return []
    // else if (num === 1) return [0]
    while (num > 2) {
        const [nextToLast, last] = array.slice(-2)
        array.push(nextToLast + last)
        num -= 1
    }
    return array
}

console.log("Without Recursion:");
console.log(fib_withoutRecursion(num))

// With Recursion
const fib_withRecursion = (num, array=[0, 1]) => {
    if (num <= 2) return array
    const [nextToLast, last] = array.slice(-2)
    return fib_withRecursion(num-1, [...array, nextToLast+last])
}

console.log("With Recursion:");
console.log(fib_withRecursion(num))

// Example 2: Fibonacci position
let pos = 5

// Without Recursion
const fibPos_withoutRecursion = (pos) => {
    if (pos <= 1) return pos
    const seq = [0, 1]
    for (let i=2; i<=pos; i++) {
        const [nextToLast, last] = seq.slice(-2)
        seq.push(nextToLast+last)
    }
    return seq[pos]
}

console.log("Without Recursion:");
console.log(fibPos_withoutRecursion(pos))

// With Recursion
const fibPos_withRecursion = (pos) => {
    if (pos <= 1) return pos
    return fibPos_withRecursion(pos-1) + fibPos_withRecursion(pos-2)
}

console.log("With Recursion:");
console.log(fibPos_withRecursion(pos))

// With Recursion 2
const fib_withRecursion_OneLine = pos => pos<2 ? pos : fib_withRecursion_OneLine(pos-1) + fib_withRecursion_OneLine(pos-2)

console.log("With Recursion (one line):");
console.log(fib_withRecursion_OneLine(pos))

// Example 3: Continuation Token from an API (just an example)

const getAWSProductIdImages = async () => {
    // Get the data with await fetch request
    // ...

    if (data.IsTruncated) {
        // recursive
        return await getAWSProductIdImages(
            productId,
            s3,             // connection to s3
            resultArray,    // accumulator
            data.NextContinuationToken
        )
    }
    return resultArray
}

// Example 4: Parser
const artistsByGenre = {
    jazz: ["Miles Davis", "John Coltrane"],
    rock: {
        classic: ["Bob Seger", "The Eagles"],
        hair: ["Def Leppard", "Whitesnake", "Poison"],
        alt: {
            classic: ["Pearl Jam", "The Killers"],
            current: ["Joywave", "Sir Sly"],
        },
    },
    unclassified: {
        new: ["Caamp", "Neil Young"],
        classic: ["Seal", "Morcheeba", "Chris Stapleton"],
    },
}

const getArtistNames = (dataObj, arr=[]) => {
    Object.keys(dataObj).forEach(key => {
        if (Array.isArray(dataObj[key])) {
            return dataObj[key].forEach(artist => {
                arr.push(artist)
            })
        }
        getArtistNames(dataObj[key], arr)
    })
    return arr
}
console.log("Artists:");
console.log(getArtistNames(artistsByGenre))