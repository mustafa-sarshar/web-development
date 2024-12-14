import { AsyncPipe } from "@angular/common";
import { Component, effect, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import {
  counterDecrementAction,
  counterIncrementAction,
} from "../store/counter.action";
import {
  counterSelector,
  counterSelectorDouble,
} from "../store/counter.selector";

type Action = "INC" | "DEC";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrl: "./counter.component.scss",
  standalone: true,
  imports: [AsyncPipe],
})
export class CounterComponent {
  public count$: Observable<number>;
  public countDouble$: Observable<number>;

  constructor(private readonly _store: Store<{ counter: number }>) {
    this.count$ = _store.select(counterSelector);
    this.countDouble$ = _store.select(counterSelectorDouble);
  }

  public actions = signal<Action[]>([]);

  public onClickCounterInc() {
    this._store.dispatch(counterIncrementAction({ value: 1 }));
  }

  public onClickCounterDec() {
    this._store.dispatch(counterDecrementAction({ value: 1 }));
  }
}
