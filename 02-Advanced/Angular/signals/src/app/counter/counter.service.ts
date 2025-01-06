import { computed, inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { DataFlowService } from "../shared/services/data-flow.service";

@Injectable()
export class CounterService {
  private readonly _dataFlowService = inject(DataFlowService);
  private readonly _router = inject(Router);

  public count = computed(() => this._dataFlowService.count());
  public countDouble = computed(() => this._dataFlowService.countDouble());

  public handleCountInc() {
    this._dataFlowService.handleUpdateCount("INC");
  }

  public handleCountDec() {
    this._dataFlowService.handleUpdateCount("DEC");
  }

  public handleExit(des: "HOME" | "STOP") {
    this._router.navigate(["", des.toLowerCase()]);
  }
}
