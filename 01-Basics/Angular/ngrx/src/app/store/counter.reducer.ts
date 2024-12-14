import { createReducer, on } from "@ngrx/store";

import {
  counterDecrementAction,
  counterIncrementAction,
} from "./counter.action";

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(counterIncrementAction, (state: number, action) => state + action.value),
  on(counterDecrementAction, (state: number, action) => state - action.value),
);
