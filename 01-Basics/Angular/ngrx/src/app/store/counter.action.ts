import { createAction, props } from "@ngrx/store";

enum CounterAction {
  INC = "[Counter] Increment",
  DEC = "[Counter] Decrement",
}

export const counterIncrementAction = createAction(
  CounterAction.INC,
  props<{ value: number }>(),
);
export const counterDecrementAction = createAction(
  CounterAction.DEC,
  props<{ value: number }>(),
);
