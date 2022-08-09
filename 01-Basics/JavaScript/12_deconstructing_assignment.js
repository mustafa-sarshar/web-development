var accelerationData = {x:0.60, y:2.10, z:7.20};

const {x: a, y:b, z:c} = accelerationData;
console.log("X: " + a + " - Y: " + b + " - Z: " + c);

const get_y_acceleration = function (acc) {
    "use strict";
    const { y: y_out } = acc;
    return y_out;
};
console.log(get_y_acceleration(accelerationData));

let collection = {
    fname: "Michael",
    mname: "",
    lname: "Jordan",
    age: 65,
    profession: "Basketball player",
};

const changeFirstAndLastName = function( {fname, lname} ) {
    return fname + " " + lname;
};
console.log(collection);
console.log(changeFirstAndLastName(collection));