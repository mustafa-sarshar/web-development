// Generics
// Example 1
const addRandomUid = (obj: object) => {
  let uid = Math.random() * 999_999_999;
  return { ...obj, uid };
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
const addRandomUid_T = <T extends object>(obj: T) => {
  let uid = Math.random() * 999_999_999;
  return { ...obj, uid };
};

const data2 = {
  name: "Ali",
  age: 25,
};
const item2 = addRandomUid_T(data2);
console.log(item2);
console.log(item2.uid);
console.log(item2.name); // this is OK now

// Generics with Interfaces
interface DataItem<T> {
  uid: string;
  category: number;
  active: boolean;
  data: T;
}

const dataItem1: DataItem<object> = {
  uid: "XXXBBB123",
  category: 1,
  active: true,
  data: { name: "Ali", age: 24 },
};

const dataItem2: DataItem<number> = {
  uid: "ABTTRBB123",
  category: 2,
  active: false,
  data: 999,
};

const dataItem3: DataItem<string[]> = {
  uid: "TTRREQWD22",
  category: 3,
  active: false,
  data: ["A", "B", "C"],
};
