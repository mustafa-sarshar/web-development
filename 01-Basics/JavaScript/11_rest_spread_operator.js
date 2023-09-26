// Rest operator
const sum = (function() {
    return function sum(...args) {
        return args.reduce((a, b) => a+b, 0);
    }
})();

console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4, 5, 6));


// Spread operator
const arr_1 = ["JAN", "FEB", "MAR", "APR", "MAY"];
let arr_2;

(function () {
    // arr_2 = arr_1; // this will not copy the items
    arr_2 = [...arr_1]; // this will copy only the items
    arr_1[0] = "This Item changed";
})();

console.log(arr_2);
