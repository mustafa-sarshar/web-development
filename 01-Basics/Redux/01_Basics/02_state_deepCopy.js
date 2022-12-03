// Source: https://www.youtube.com/watch?v=7bMTJxvEJiE&list=PL55RiY5tL51rrC3sh8qLiYHqUV3twEYU_&index=4
import { createStore } from "redux";

// Define Reducer
const initialState = {
  result: 1,
  lastValues: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      state = {
        ...state,
        result: state.result + action.payload,
        lastValues: [...state.lastValues, action.payload],
      };
      break;
    case "SUBTRACT":
      state = {
        ...state,
        result: state.result - action.payload,
        lastValues: [...state.lastValues, action.payload],
      };
      break;
  }
  return state;
};

const store = createStore(reducer);

// Set a callback whenever store is updated
store.subscribe(() => {
  console.log("Store updated", store.getState());
});

// Test the Redux code
let payload = 0;
console.log("Initial state is:", initialState);

payload = 10;
// Dispatch an action
console.log("Add", payload);
store.dispatch({
  type: "ADD",
  payload: payload,
});

payload = 20;
// Dispatch an action
console.log("Add", payload);
store.dispatch({
  type: "ADD",
  payload: payload,
});

payload = 5;
// Dispatch an action
console.log("Subtract", payload);
store.dispatch({
  type: "SUBTRACT",
  payload: payload,
});
