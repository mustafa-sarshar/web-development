// Example 1
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


// Example 2
class Vehicle {
    constructor() {
        this.wheels = 4
        this.motorized = true
    }
    ready() {
        return "Ready to go!"
    }
}

class Motocycle extends Vehicle {
    constructor() {
        super()
        this.wheels = 2
    }
    wheelie() {
        return "On one wheel now!"
    }
}

const myBike = new Motocycle()
console.log(myBike);
console.log(myBike.ready());
console.log(myBike.wheelie());


// Example 3
class Rectangle {
    "use strict";
    static objectName = "Rectangle";        // Static property

    #locations = [];                        // Private field
    constructor(height, width, location=[0, 0]) {
        this.height = height;
        this.width = width;
        this.location = location;
        this.#locations = [...this.calcLocations()];
    }

    calcLocations() {
        return [
            this.location,
            [this.location[0]+this.width, this.location[1]],
            [this.location[0]+this.width, this.location[1]+this.height],
            [this.location[0], this.location[1]+this.height]
        ]
    }

    // Getter
    get area() {
        return this.calcArea();
    }

    // Method
    calcArea() { return this.height * this.width; }

    summary() { console.log(`Height: ${this.height}\tWidth: ${this.width}\tArea: ${this.area}\nLocation (TopLeft): X=${this.location[0]} Y=${this.location[1]}`); }

    // Setter
    set updateHeight(height) {
        if (height > 0) this.height = height;
        else {
            this.height = 0
            throw new Error("Height must be higher than 0 !!!");
        }
    }

    // Generator
    *getLocations() {
        for (const loc of this.#locations)
            yield loc;
    }
}

const myRectangle = new Rectangle(10, 20);
myRectangle.summary();
console.log([...myRectangle.getLocations()]);