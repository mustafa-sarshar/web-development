"use strict";
// Person object
const mike = {
    name: "Mike",
    age: 55,
    speak(text) {
        console.log(text);
    },
    spend(amount) {
        return amount;
    },
};
// Animal class
class Animal {
    constructor(name, race) {
        this.name = name;
        this.race = race;
    }
    bite() {
        console.log(`${this.name} is biting!`);
    }
    eat(food) {
        console.log(`${this.name} is eating ${food}, because he/she is ${this.race}`);
    }
}
