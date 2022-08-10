function Person(fName, lName) {
    this.firstName = fName
    this.lastName = lName
}

const person1 = new Person("Kobe", "Bryant")
const person2 = new Person("Vince", "Carter")

console.log(person1, person2)

// Add a function to the Object via prototyping which will be applied to all instances as well
Person.prototype.getFullName = function() {
    if (this.isSuperHero) {
        return this.firstName + " " + this.lastName + " is a SuperHero"
    } else {
        return this.firstName + " " + this.lastName
    }
}

console.log(person1.getFullName())
console.log(person2.getFullName())

// Prototypal inheritance
function SuperHero(fName, lName) {
    // this = {}
    Person.call(this, fName, lName)
    this.isSuperHero = true
}
SuperHero.prototype.fightCrime = function () {
    console.log("Fighting against crime started!")
}
SuperHero.prototype = Object.create(Person.prototype) // Now SuperHero has access to the prototype of Person, which means the getFullName method
SuperHero.prototype.constructor = SuperHero

const shaq = new SuperHero("Shaquille", "O'Neal")
console.log(shaq.getFullName())

console.log("\n")

// Another implementation of prototypes via __proto__
// Object literals
const person = {
    alive: true
}
const musician = {
    plays: true
}
// musician.__proto__ = person
Object.setPrototypeOf(musician, person)

console.log("Person:")
loopThroughObject(person)
console.log("Musician:")
loopThroughObject(musician)

// Extending the prototype chain
const guitarist = {
    strings: 6,
    __proto__: musician
}
console.log("Guitarist:");
loopThroughObject(guitarist)

console.log("\n")

// Object with getter and setter methods
const car = {
    doors: 2,
    seats: "vinyl",
    get seatMaterial() {
        return this.seats
    },
    set seatMaterial(material) {
        this.seats = material
    }
}
const luxuryCar = {}
Object.setPrototypeOf(luxuryCar, car)
luxuryCar.seatMaterial = "leather"
console.log("Luxury Car:")
loopThroughObject(luxuryCar)

// Prototype für object constructor
function Animal(species) {
    this.species = species
    this.eats = true;
}
Animal.prototype.walks = function () {
    return `A ${this.species} is walking.`
}

const bear = new Animal("bear")
console.log("Bear")
loopThroughObject(bear)
console.log(bear.walks())
console.log(bear.__proto__);








// Custome Function /////////////////////////////////////////////////////////
function loopThroughObject(obj) {
    // for (const key in obj) {
    //     console.log(`${key}:\t${obj[key]}`)
    // }
    Object.keys(obj).forEach(key => {
        if (obj.hasOwnProperty(key)) {
            console.log(`${key}: ${obj[key]}`)
        }        
    })
    console.log("\n")
}