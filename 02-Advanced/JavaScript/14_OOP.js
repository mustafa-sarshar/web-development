// via object literal approach
const circle = {
    radius: 1,
    location: {
        x: 1,
        y: 1,
        z: 1
    },
    draw: function () {
        console.log("Drawing...");
    },
    summary: function () {
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
        draw: function () {
            console.log("Drawing...");
        },
        summary: function () {
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
    this.draw = function () {
        console.log("Drawing...");
    }
    this.summary = function () {
        console.log(`Summary:\nRadius: ${this.radius}\tLocation: X:${this.location.x}, Y:${this.location.y}, Z:${this.location.z}.`);
    }
};

const myCircle2 = new Circle(20);
myCircle2.summary()

const Circle_FuncConst = new Function("radius", "location = { x:1, y:1, z:1 }", `
    this.radius = radius;
    this.location = location;
    this.draw = function () {
        console.log("Drawing...");
    }
    this.summary = function () {
        console.log("Radius:", this.radius, "\tLocation", this.location);
    }
`);

const myCircle3 = new Circle_FuncConst(1, { x:100, y:150, z:12 });
myCircle3.summary();


// Private Members
function Car(model, color, maxSpeed) {
    let objectName = "car";     // private property
    this.model = model;
    this.color = color;
    this.maxSpeed = maxSpeed;
    this.startEngine = function () {
        console.log(`The ${objectName} '${this.model}' started and will reach the max speed of ${this.maxSpeed} km/h.`);
    };
    this.stopEngine = function () {
        console.log(`The ${objectName} '${this.model}' stopped!!!`);
    };
    this.summary = function () {
        console.log(`The ${objectName} has model: '${this.model}'\tColor: ${this.color}, Max speed: ${this.maxSpeed}.`);
    };
    const resetCarSettings = () => {       // private method
        this.model = undefined;
        this.color = undefined;
        this.maxSpeed = undefined;
    };
    this.resetObject = function () {
        resetCarSettings(this);
        console.log(`The ${objectName}'s settings reset!!!`);
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
    let objectName = "house";     // private property
    this.type = type;
    this.color = color;
    this.size = size;
    this.status = "free";
    this.rent = function () {
        console.log(`The ${objectName} '${this.type}' rented.`);
        this.status = "rented";
    };
    this.sell = function () {
        console.log(`The ${objectName} '${this.type}' sold!!!`);
        this.status = "sold";
    };
    this.summary = function () {
        console.log(`The ${objectName} has type: '${this.type}'\tColor: ${this.color}\tsize: ${this.size}\tcurrent status: ${this.status}.`);
    };
    const resetHouseSettings = () => {       // private method
        this.type = undefined;
        this.color = undefined;
        this.size = undefined;
        this.status = "free";
    };
    this.resetObject = function () {
        resetHouseSettings(this);
        console.log(`The ${objectName}'s settings reset!!!`);
        this.summary();
    };

    Object.defineProperty(this, "objectName", {
        get: function () { return objectName; },
        set: function (value) {
            if (typeof value !== "string") throw Error("Object name must be a string!!!");
            objectName = value;
        }
    });
};

const myHouse = new House("Villa", "brown", "big");
console.log("Object Name:", myHouse.objectName);
// myHouse.objectName = 123;        // Throws an Error.
myHouse.summary();
myHouse.rent();
myHouse.sell();
myHouse.resetObject();

// Stop Watch Object
const StopWatch = function () {
    let startTimePoint = 0;
    let stopTimePoint = 0;
    let duration = 0;
    let running = false;
    this.startTimer = function () {
        if (running) {
            console.log("Please stop the timer first!");
            return false;
        }
        startTimePoint = new Date().getTime();
        stopTimePoint = 0;
        running = true;
        console.log("Timer started!");
    };
    this.stopTimer = function () {
        if (!running) {
            console.log("Please start the timer first!");
            return false;
        }
        stopTimePoint = new Date().getTime();
        duration += stopTimePoint - startTimePoint;
        running = false;
        console.log("Timer stopped!");
    };
    this.resetTimer = function () {
        startTimePoint = 0;
        stopTimePoint = 0;
        duration = 0;
        running = false;
        console.log("Timer reset!!!");
    };
    this.summary = function () {
        console.log(`Start time point: ${startTimePoint}\tStop time point: ${stopTimePoint}\tDuration: ${duration} (ms).`);
    };
    Object.defineProperty(this, "duration", {
        get: function () { return duration; },
        set: function (value) { duration = value }
    });
};

const myStopWatch = new StopWatch();
myStopWatch.summary();
myStopWatch.stopTimer()
myStopWatch.startTimer();
myStopWatch.summary();
sleepFor(1000);
myStopWatch.stopTimer()
myStopWatch.summary();
myStopWatch.startTimer();
myStopWatch.summary();
sleepFor(3000);
myStopWatch.stopTimer()
myStopWatch.summary();
myStopWatch.resetTimer();
myStopWatch.summary();

function sleepFor(durationMS){
    let timeNow = new Date().getTime();
    while (new Date().getTime() < timeNow + durationMS) { 
        /* Do nothing */ 
    };
};