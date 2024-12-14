import { createSelector } from "@ngrx/store";

export const counterSelector = (state: { counter: number }) => state.counter;
export const counterSelectorDouble = createSelector(
  counterSelector,
  (state) => state * 2,
);
