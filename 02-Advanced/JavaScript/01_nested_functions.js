let a = 10

function outer() {
    let b = 20
    function inner() {
        let c = 100
        console.log(a + ", " + b + ", " + c);
    }
    inner()
}

outer();