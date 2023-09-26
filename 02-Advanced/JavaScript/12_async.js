setTimeout(() => {
  console.log("First");
}, 0);

const promise1 = fetch("www.udemy.com/vishwas");
promise1.then((value) => {
  console.log("THEN 1: Promise value is", value.status);
});

for (let i = 0; i < 1000000000; i++) {}

console.log("Fourth");
