// https://www.youtube.com/watch?v=ZKCYqJu4n3s&list=PL55RiY5tL51rrC3sh8qLiYHqUV3twEYU_&index=3
import { createStore } from "redux";

// Define Reducer
const initialState = 1;
const reducer = (state = "", action) => {
  switch (action.type) {
    case "ADD":
      state = state + action.payload;
      break;
    case "SUBTRACT":
      state = state - action.payload;
      break;
  }
  return state;
};

const store = createStore(reducer, initialState);

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
