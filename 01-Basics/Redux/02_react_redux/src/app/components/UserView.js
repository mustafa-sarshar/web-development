import React from "react";

// Stateless Component
const UserView = (props) => {
  console.log("UserView:", props);

  if (!props.user.name) {
    return <p>Wait...</p>;
  }
  return (
    <>
      <h1>User View</h1>
      <h3>
        Name: <b>{props.user.name}</b>
      </h3>
      <p>
        Age: <b>{props.user.age}</b>
      </p>
      <p>
        Parents: <b>{props.user.parents.join(" and ")}</b>
      </p>
      <p>
        Birth: <b>{props.user.birth}</b>
      </p>
      <button onClick={() => props.dispatchers.setAge(50)}>
        Change the Age to 50
      </button>
      <button onClick={() => props.dispatchers.setParents("Bob", "Rose")}>
        Change parents to Bob and Rose
      </button>
      <button onClick={() => props.dispatchers.setBirth("1990-02-10")}>
        Change birth to 1990-02-10
      </button>
    </>
  );
};

export default UserView;
