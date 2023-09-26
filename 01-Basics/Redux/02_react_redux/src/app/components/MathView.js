import React from "react";

// Stateless Component
const MathView = (props) => {
  console.log("MathView:", props);
  if (!props.math.result || !props.math.lastValues.length === 0) {
    return <p>Wait...</p>;
  }
  return (
    <>
      <h1>Math View</h1>
      <h3>{props.math.result}</h3>
      <p>
        {props.math.lastValues.length > 0 && props.math.lastValues.toString()}
      </p>
    </>
  );
};

export default MathView;
