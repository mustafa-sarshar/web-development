var myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(myArray + " - " + typeof myArray);

// Add an item to the array
myArray.push("new item");
console.log(myArray);

// Omit the last item of the array
myArray.pop();
console.log(myArray);

// Omit the first item of the array
myArray.shift();
console.log(myArray);

// Add an item to the first index of the array
myArray.unshift("First item");
console.log(myArray);

const arrayFilled = myArray.fill(20, 3, 8);
console.log(myArray, arrayFilled);

// All 1 array
const arr_ones = Array.from({ length: 10 }, () => 1);
console.log(arr_ones);

// Array 1 to 10
const arr_1to10 = Array.from({ length: 10 }, (cur, i) => i + 1);
console.log(arr_1to10);
