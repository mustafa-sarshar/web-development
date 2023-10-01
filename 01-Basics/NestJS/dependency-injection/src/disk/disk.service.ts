import { Injectable } from "@nestjs/common";
import { PowerService } from "src/power/power.service";

@Injectable()
export class DiskService {
  constructor(private readonly _powerService: PowerService) {}

  public getData() {
    console.log("Drawing 20 watts of power from PowerService");
    this._powerService.supplyPower(20);

    return "data";
  }
}
