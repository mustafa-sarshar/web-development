import {
  Component,
  computed,
  effect,
  EffectCleanupRegisterFn,
  inject,
  input,
  OnDestroy,
  OnInit,
  untracked,
} from "@angular/core";

import { CounterService } from "./counter.service";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrl: "./counter.component.scss",
  standalone: true,
  imports: [],
  providers: [CounterService],
})
export class CounterComponent implements OnInit, OnDestroy {
  public counterId = input.required<string>();
  private readonly _counterService = inject(CounterService);

  public count = computed(() => this._counterService.count());
  public countDouble = computed(() => this._counterService.countDouble());

  private effectRef = effect(
    (onCleanUp: EffectCleanupRegisterFn) => {
      const counterId = this.counterId();
      const count = this._counterService.count();

      const timer = setTimeout(() => {
        console.log(`[Counter ${counterId}]: ${count}`);
      }, 1000);

      onCleanUp(() => {
        clearTimeout(timer);
        console.log(`Timer (${timer} cleaned!)`);
      });
    },
    { manualCleanup: false },
  );

  public ngOnInit() {}

  public ngOnDestroy() {
    this.effectRef.destroy();
  }

  public onClickInc() {
    this._counterService.handleCountInc();
  }

  public onClickDec() {
    this._counterService.handleCountDec();
  }

  public onClickExit() {
    if (this.counterId().includes("HOME")) {
      this._counterService.handleExit("STOP");
    } else {
      this._counterService.handleExit("HOME");
    }
  }
}
