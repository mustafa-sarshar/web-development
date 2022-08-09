function fn_randomNumber(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min)
}

var N = 10
var min = 10
var max = 100
console.log(`Random ${N} numbers between ${min} and ${max}:`)
for (let i=0; i<N; i++) {
    console.log(i+1 + "- " + fn_randomNumber(10, 100))
}

