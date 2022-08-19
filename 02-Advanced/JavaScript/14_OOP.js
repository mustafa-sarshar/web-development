// via object literal approach
const circle = {
    radius: 1,
    location: {
        x: 1,
        y: 1,
        z: 1
    },
    draw: function() {
        console.log("Drawing...");
    },
    summary: function() {
        console.log(`Summary:\nRadius: ${this.radius}\tLocation: X:${this.location.x}, Y:${this.location.y}, Z:${this.location.z}.`)
    },
};

circle.draw();
circle.summary();

// Factory Function
function createCircle(radius, location={ x:1, y:1, z:1 }) {
    return {
        radius,
        location,
        draw: function() {
            console.log("Drawing...");
        },
        summary: function() {
            console.log(`Summary:\nRadius: ${this.radius}\tLocation: X:${this.location.x}, Y:${this.location.y}, Z:${this.location.z}.`)
        },
    };
};

const myCircle = createCircle(10, { x:10, y:10, z:100 });
myCircle.summary();

// Constructor Function
function Circle(radius, location={ x:1, y:1, z:1 }) {
    this.radius = radius;
    this.location = location;
    this.draw = function() {
        console.log("Drawing...");
    }
    this.summary = function() {
        console.log(`Summary:\nRadius: ${this.radius}\tLocation: X:${this.location.x}, Y:${this.location.y}, Z:${this.location.z}.`);
    }
};

const myCircle2 = new Circle(20);
myCircle2.summary()

const Circle_FuncConst = new Function("radius", "location = { x:1, y:1, z:1 }", `
    this.radius = radius;
    this.location = location;
    this.draw = function() {
        console.log("Drawing...");
    }
    this.summary = function() {
        console.log("Radius:", this.radius, "\tLocation", this.location);
    }
`);

const myCircle3 = new Circle_FuncConst(1, { x:100, y:150, z:12 });
myCircle3.summary();


// Private Members
function Car(model, color, maxSpeed) {
    let object = "car";     // private property
    this.model = model;
    this.color = color;
    this.maxSpeed = maxSpeed;
    this.startEngine = function() {
        console.log(`The ${object} '${this.model}' started and will reach the max speed of ${this.maxSpeed} km/h.`);
    };
    this.stopEngine = function() {
        console.log(`The ${object} '${this.model}' stopped!!!`);
    };
    this.summary = function () {
        console.log(`The ${object} has model: '${this.model}'\tColor: ${this.color}, Max speed: ${this.maxSpeed}.`);
    };
    const resetCarSettings = () => {       // private method
        this.model = undefined;
        this.color = undefined;
        this.maxSpeed = undefined;
    };
    this.resetObject = function () {
        resetCarSettings(this);
        console.log(`The ${object}'s settings reset!!!`);
        this.summary();
    };
};

const myCar = new Car("Tesla", "DarkBlue", 400)
myCar.startEngine();
myCar.stopEngine();
myCar.summary();
myCar.resetObject();


// Getter and setter
function House(type, color, size) {
    let object = "house";     // private property
    this.type = type;
    this.color = color;
    this.size = size;
    this.status = "free";
    this.rent = function() {
        console.log(`The ${object} '${this.type}' rented.`);
        this.status = "rented";
    };
    this.sell = function() {
        console.log(`The ${object} '${this.type}' sold!!!`);
        this.status = "sold";
    };
    this.summary = function () {
        console.log(`The ${object} has type: '${this.type}'\tColor: ${this.color}\tsize: ${this.size}\tcurrent status: ${this.status}.`);
    };
    const resetHouseSettings = () => {       // private method
        this.type = undefined;
        this.color = undefined;
        this.size = undefined;
        this.status = "free";
    };
    this.resetObject = function () {
        resetHouseSettings(this);
        console.log(`The ${object}'s settings reset!!!`);
        this.summary();
    };
};

const myHouse = new House("Villa", "brown", "big");
myHouse.summary();
myHouse.rent();
myHouse.sell();
myHouse.resetObject();