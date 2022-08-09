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