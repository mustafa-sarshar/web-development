const initialStateUserReducer = {
  name: "Person 1",
  age: 30,
  parents: ["Joe", "Katie"],
  birth: "1900-02-01",
};

const userReducer = (state = initialStateUserReducer, action) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_AGE":
      return {
        ...state,
        age: action.payload,
      };
    case "SET_PARENTS":
      return {
        ...state,
        parents: action.payload,
      };
    case "SET_BIRTH_FULFILLED":
      return {
        ...state,
        birth: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
