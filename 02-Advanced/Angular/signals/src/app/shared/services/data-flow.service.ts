import { computed, Injectable, signal } from "@angular/core";

@Injectable()
export class DataFlowService {
  public count = signal<number>(0);
  public countDouble = computed<number>(() => this.count() * 2);

  constructor() {}

  public handleUpdateCount(actionType: "INC" | "DEC") {
    switch (actionType) {
      case "INC":
        this.count.update((val: number) => val + 1);
        break;
      case "DEC":
        this.count.update((val: number) => val - 1);
        break;
      default:
        break;
    }
  }

  public handleCountDec() {}
}
