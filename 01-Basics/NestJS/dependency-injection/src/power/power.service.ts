import { Injectable } from "@nestjs/common";

@Injectable()
export class PowerService {
  public supplyPower(watts: number) {
    console.log(`Supplying ${watts} of power.`);
  }
}
