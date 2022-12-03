import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

// Reducers
import mathReducer from "./reducers/mathReducer";
import userReducer from "./reducers/userReducer";

const reducers = combineReducers({ mathReducer, userReducer });
const store = createStore(
  reducers,
  {},
  applyMiddleware(logger(), thunk, promise)
);

export default store;
