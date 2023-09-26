// Implicit binding
const person = {
    name: "Musto",
    sayMyName_implicitBinding: function () {
        console.log(`My name is ${this.name}`)
    },
}
person.sayMyName_implicitBinding()

// Explicit binding
function sayMyName_explicitBinding() {
    console.log(`My name is ${this.name}`)
}
sayMyName_explicitBinding.call(person)

// New binding
function Person(name) {
    // this = {}  the new keyword creates this objects automatically for us
    this.name = name
}
const p1 = new Person("Person 1")
const p2 = new Person("Person 2")
const p3 = new Person("Person 3")

console.log(p1.name, p2.name, p3.name);

// Default binding
globalThis.name = "Superman"
function sayMyName_defaultBinding() {
    console.log(`My name is ${this.name}`)
}
sayMyName_defaultBinding()


/*
Note: the order of precedence is as follows:
1- New binding
2- Explicit binding
3- Implicit binding
4- Default binding
*/