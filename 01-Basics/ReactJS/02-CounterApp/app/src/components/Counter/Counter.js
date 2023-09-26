import React, { useState } from "react";

function Counter() {
    const [count, setCount] = useState(() => {
        console.log("Set the initial value to 10");
        return 10;
    });

    function decrease() {
        if (count > 0) setCount((curCount) => curCount - 1);
    }
    function increase() {
        setCount((curCount) => curCount + 1);
    }

    return (
        <>
            <button onClick={decrease}>-</button>
            <span>{count}</span>
            <button onClick={increase}>+</button>
        </>
    );
}

export default Counter;
