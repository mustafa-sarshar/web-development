class Person {
    constructor(fName, lName) {
        this.firstName = fName
        this.lastName = lName
    }

    getName () {
        return this.firstName + " " + this.lastName
    }

    sayName() {
        console.log(this.getName())
    }
}

const person1 = new Person("Allen", "Iverson")
person1.sayName()

// Inheritance for classes
class Superman extends Person {
    constructor(fName, lName) {
        super(fName, lName)
        this.isSuperman = true
    }

    activeSuperman() {
        console.log("The superman is in the building!")
    }
}
const superman1 = new Superman("Stephan", "Curry")
superman1.sayName()
superman1.activeSuperman()