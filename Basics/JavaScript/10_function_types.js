// Normal function
function magic_normal() {
    return new Date();
};

// Anonymous function
const magic_annonymous = function () {
    return new Date();  
};

// Arrow function
const magic_arrow = () => {
    return new Date();
};

// Compact version of the Arrow function
const magic_arrow_compact = () => new Date();


console.log(magic_normal());
console.log(magic_annonymous());
console.log(magic_arrow());
console.log(magic_arrow_compact());

// With parameters
const magic_arrow_compact_with_params = (str_1, str_2) => str_1.concat(str_2);
console.log(magic_arrow_compact_with_params("Hello ", "World!"));

// Another example
let realNumberArray = [4, 5.5, -6, 22.998, 445.01, 200, 49, 98.12];

const squareList = (arr) => {
    const squaredIntegers = arr.filter(num => Number.isInteger(num) && num > 0).map(x => x * x);
    return squaredIntegers;
};
const squaredIntegers = squareList(realNumberArray);
console.log(squaredIntegers);

