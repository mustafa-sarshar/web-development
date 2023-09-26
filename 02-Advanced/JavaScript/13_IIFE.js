// IIFE: Immediately-Invoked Function Expression (pronounced: iffy)
// Variations:
// With anonymous arrow function inside:
(() => {
    console.log("Anonymous IIFE");
})();

// With the function keyword:
(function() {
    console.log("IIFE with function keyword");
})();

// With a function name
(function myIIFE() {
    console.log("IIFE with function name");
})();

// With a function name (allows for recursion)
(function myIIFERecursive(num) {
    num++;
    console.log(`IIFE with function name (recursive) - Num: ${num}`);
    return num !== 5 ? myIIFERecursive(num) : console.log("IIFE with function name (recursive) finished!!!");
})(num=0);

// Reasons to use IIFE:
// Reason 1) Does not pollute the global object namespace.
const appName = "IIFEee";
const getAppName = () => "The App name is " + appName;

// Isolate declarations within the function
(() => {
    const appName = "IIFEee-Local";
    const getAppName = () => "The App name is " + appName;
    console.log(appName);
    console.log(getAppName());
})();

console.log(appName);
console.log(getAppName());

// Reason 2) Private Variables and Methods from Closure
const increment = (() => {
    let counter = 0;
    console.log(counter);
    const getCredits = (credit) => console.log(`Current credit points: ${counter}`);
    return () => {
        counter++;
        getCredits(counter);
    };
})();
increment();
increment();
increment();

// Reason 3) The Module Pattern
const Popularity = (() => {
    let count = 0;

    return {
        current: () => { return count },
        increment: () => { count++ },
        reset: () => { count = 0 }
    };
})();
console.log(Popularity.current());
Popularity.increment();
console.log(Popularity.current());
Popularity.increment();
console.log(Popularity.current());
Popularity.reset();
console.log(Popularity.current());

// The Revealing Pattern is a variation of the Module Pattern
const Popularity2 = (() => {
    let count = 0;

    const current = () => { return count };
    const increment = () => { count++ };
    const reset = () => { count = 0 };

    return {
        current: current,
        increment: increment,
        reset: reset
    };
})();
console.log(Popularity2.current());
Popularity2.increment();
console.log(Popularity2.current());
Popularity2.increment();
console.log(Popularity2.current());
Popularity2.reset();
console.log(Popularity2.current());

// Injecting a namespace object
// ((namespace) => {
//     namespace.count = 0;
//     namespace.current = function () { return this.count; };
//     namespace.increment = function () { this.count++; };
//     namespace.reset = function () { this.count = 0; };
// })(window.App = window.App || {});

// App.increment();
// console.log(App.current());