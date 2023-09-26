// ... Category: Observer Pattern
// Purpose:
// Define Objects

function Subject() {
    this.observers = [];
}
Subject.prototype = {
    subscribe: function (fn) {
        this.observers.push(fn);
    },
    unsubscribe: function (fnToRemove) {
        this.observers = this.observers.filter((fn) => {
            if (fn !== fnToRemove)
                return fn;
        });
    },
    run: function () {
        this.observers.forEach((fn) => {
            fn.call();
        });
    }
}
const subject = new Subject();
// Define Observers
const func1 = () => { console.log(("Func 1")) }
const func2 = () => { console.log(("Func 2")) }
const func3 = () => { console.log(("Func 3")) }

subject.subscribe(func1);
subject.subscribe(func2);
subject.subscribe(func3);
subject.run();

subject.unsubscribe(func2);
subject.run();