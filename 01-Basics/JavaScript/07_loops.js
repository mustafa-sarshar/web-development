var array_1 = []
var array_2 = []
var array_3 = []

const N = 10

for (let i=0; i<N; i++) {
    array_1.push(i+1)
}
console.log(array_1)

let j = 10
do {
    array_2.push(j+1)
    j++
} while (j<N+10)
console.log(array_2)

let k = 100
while (k<N+100) {
    array_3.push(k+1)
    k++
}
console.log(array_3)