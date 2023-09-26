const arr: (number | number[])[] = [1, 2, 3, 4, 5, [1, 2], [1, 2, 3, 4]];

console.log("START For");
for (const [i, val] of arr.entries()) {
  console.log(i, val);
}

console.log("START forEach Fn");
arr.forEach(function (value) {
  console.log(value);
});

console.log("START forEach Arrow");
arr.forEach((value) => {
  console.log(value);
});

console.log("Flat", arr.flat());
