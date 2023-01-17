"use strict";
class Person {
    constructor(name, age, gender) {
        this.category = "human";
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.summary = `${name} is a ${gender} and has ${age} years old`;
    }
    greet() {
        return `Welcome ${this.name}`;
    }
    getSummary() {
        return this.summary;
    }
}
const person1 = new Person("Ali", 22, "male");
console.log(person1.greet());
console.log(person1.getSummary());
console.log(person1.category);
