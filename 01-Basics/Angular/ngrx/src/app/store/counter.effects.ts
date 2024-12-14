import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { tap, withLatestFrom } from "rxjs";

import {
  counterDecrementAction,
  counterIncrementAction,
} from "./counter.action";
import { counterSelector } from "./counter.selector";

@Injectable()
export class CounterEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<{ counter: number }>,
  ) {}

  public saveCount$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(counterIncrementAction, counterDecrementAction),
        withLatestFrom(this._store.select(counterSelector)),
        tap(([action, data]) => {
          console.log(action);
          window.localStorage.setItem("count", data.toString());
        }),
      ),
    { dispatch: false }, // it says that this function will not dispatch a new action
  );
}
