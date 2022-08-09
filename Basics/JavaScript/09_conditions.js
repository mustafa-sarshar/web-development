function checkSign_with_if(num) {
    if (num < 0) {
        return "negative"
    } else if (num > 0) {
        return "positive"
    } else {
        return "zero"
    }
}

function checkSign_with_ternary(num) {
    return num < 0 ? "negative" : num > 0 ? "positive" : "zero"
}

var num = 10
console.log(num + " is: " + checkSign_with_if(num))
console.log(num + " is: " + checkSign_with_ternary(num))

var num = -10
console.log(num + " is: " + checkSign_with_if(num))
console.log(num + " is: " + checkSign_with_ternary(num))

var num = 0
console.log(num + " is: " + checkSign_with_if(num))
console.log(num + " is: " + checkSign_with_ternary(num))