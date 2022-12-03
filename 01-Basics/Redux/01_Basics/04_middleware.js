// Source: https://www.youtube.com/watch?v=AgO7YcJeBh4&list=PL55RiY5tL51rrC3sh8qLiYHqUV3twEYU_&index=6
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger"; // redux-logger@2.6.1

// Define Reducers
const initialStateMathReducer = {
  result: 1,
  lastValues: [],
};
const mathReducer = (state = initialStateMathReducer, action) => {
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

const initialStateUserReducer = {
  name: "Person 1",
  age: 30,
};

const userReducer = (state = initialStateUserReducer, action) => {
  switch (action.type) {
    case "SET_NAME":
      state = {
        ...state,
        name: action.payload,
      };
      break;
    case "SET_AGE":
      state = {
        ...state,
        age: action.payload,
      };
      break;
  }
  return state;
};

const reducers = combineReducers({ mathReducer, userReducer });

// Custom Logger
// const myLogger = (store) => (next) => (action) => {
//   console.log("Logged Store", store.getState());
//   console.log("Logged Action:", action);
//   next(action);
// };

const store = createStore(reducers, {}, applyMiddleware(logger()));

// Set a callback whenever store is updated
store.subscribe(() => {
  // console.log("Store updated", store.getState());
});

// Test the Redux code
let payload = 0;
console.log("Initial state is:", initialStateMathReducer);

payload = 10;
// Dispatch an action
// console.log("Add", payload);
store.dispatch({
  type: "ADD",
  payload: payload,
});

payload = 20;
// Dispatch an action
// console.log("Add", payload);
store.dispatch({
  type: "ADD",
  payload: payload,
});

payload = 5;
// Dispatch an action
// console.log("Subtract", payload);
store.dispatch({
  type: "SUBTRACT",
  payload: payload,
});

payload = "Person 2";
// Dispatch an action
// console.log("Name", payload);
store.dispatch({
  type: "SET_NAME",
  payload: payload,
});

payload = 20;
// Dispatch an action
// console.log("Age", payload);
store.dispatch({
  type: "SET_AGE",
  payload: payload,
});
