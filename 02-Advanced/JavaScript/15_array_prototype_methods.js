// Apply filter() and sort() methods.
const players = [
    { id: 0, sport: "Basketball", age: 28, salary: 12_000_000 },
    { id: 1, sport: "Soccer", age: 35, salary: 500_000 },
    { id: 2, sport: "Football", age: 26, salary: 11_000_000 },
    { id: 3, sport: "Baseball", age: 31, salary: 990_000 },
    { id: 4, sport: "MMA", age: 25, salary: 4_000_000 },
];

const richtnessThreshold = 1_000_000;
const oldnessThreshold = 30;

const richtPlayers = [...players].filter(player => player.salary > richtnessThreshold);
const oldPlayers = [...players].filter(player => player.age > oldnessThreshold);
const playersSortedBySalary = [...players].sort((playerA, playerB) => playerB.salary - playerA.salary );
const playersSortedByAge = [...players].sort((playerA, playerB) => playerB.age - playerA.age );

console.log("Player:", players);
console.log("Rich players:", richtPlayers);
console.log("Old players:", oldPlayers);
console.log("Players sorted by salary (desc.):", playersSortedBySalary);
console.log("Players sorted by age (desc.):", playersSortedByAge);
console.log("Players:", players);

// Apply map() method.
const colors = ["red", "blue", "black", "yellow", "green"];

let counter = 0;
const colorsWithInfo = colors.map(color => `Color ${color} has index ${counter++}`);
console.log(colorsWithInfo);

// Apply concat() method
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [10, 20, 30, 40, 50];
const arr12 = arr1.concat(arr2);        // equals to const arr12 = [...arr1, ...arr2];
console.log("Arr1:", arr1);
console.log("Arr2:", arr2);
console.log("Arr12:", arr12);
