var varGlobal1 = "global var 1";

// Variable Scopes
function func1() {
    var varLocal_func1 = "local var - func 1";
    console.log("From func1: " + varLocal_func1);
}

function func2() {
    varNotLocal_func2 = "not local var - func 2";
    var varLocal_func2 = "local var - func 2";
    console.log("From func2: " + varNotLocal_func2);
    console.log("From func2: " + varLocal_func2);
}

function func3() {
    console.log("From func3: " + varGlobal1);
    try {
        console.log("From func3: " + varLocal_func1);
    } catch(err) {
        console.log("From func3: " + err);
    }
    try {
        console.log("From func3: " + varLocal_func2);
    } catch(err) {
        console.log("From func3: " + err);
    }
    console.log("From func3: " + varNotLocal_func2);
}

func1();
func2();
func3();