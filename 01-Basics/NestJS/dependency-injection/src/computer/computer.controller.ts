import { Controller, Get } from "@nestjs/common";

import { CpuService } from "src/cpu/cpu.service";
import { DiskService } from "src/disk/disk.service";

@Controller("computer")
export class ComputerController {
  constructor(
    private readonly _cpuService: CpuService,
    private readonly _diskService: DiskService,
  ) {}

  @Get()
  public run() {
    return [this._cpuService.compute(1, 2), this._diskService.getData()];
  }
}
