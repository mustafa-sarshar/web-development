import { Injectable } from "@nestjs/common";

import { PowerService } from "src/power/power.service";

@Injectable()
export class CpuService {
  constructor(private readonly _powerService: PowerService) {}

  public compute(a: number, b: number) {
    console.log("Drawing 10 watts of power from PowerService");
    this._powerService.supplyPower(10);

    return a + b;
  }
}
