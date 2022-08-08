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