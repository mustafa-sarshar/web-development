"use strict";
// Generics
// Example 1
const addRandomUid = (obj) => {
    let uid = Math.random() * 999999999;
    return Object.assign(Object.assign({}, obj), { uid });
};
const data1 = {
    name: "Ali",
    age: 25,
};
const item1 = addRandomUid(data1);
console.log(item1);
console.log(item1.uid);
// console.log(item1.name); // raises an error
// Example 2
const addRandomUid_T = (obj) => {
    let uid = Math.random() * 999999999;
    return Object.assign(Object.assign({}, obj), { uid });
};
const data2 = {
    name: "Ali",
    age: 25,
};
const item2 = addRandomUid_T(data2);
console.log(item2);
console.log(item2.uid);
console.log(item2.name); // this is OK now
const dataItem1 = {
    uid: "XXXBBB123",
    category: 1,
    active: true,
    data: { name: "Ali", age: 24 },
};
const dataItem2 = {
    uid: "ABTTRBB123",
    category: 2,
    active: false,
    data: 999,
};
const dataItem3 = {
    uid: "TTRREQWD22",
    category: 3,
    active: false,
    data: ["A", "B", "C"],
};
