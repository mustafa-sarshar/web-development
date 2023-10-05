import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

import { ReportsService } from "./reports.service";
import { DataSerializer } from "../../shared/interceptors/serialize.interceptor";
import { AuthGuard } from "../auth/guards/auth.guard";
import { CurrentUser } from "../users/decorators/current-user/current-user.decorator";
import { User } from "../users/entities/user.entity";

import { ReportDto } from "./dto/report.dto";
import { CreateReportDto } from "./dto/create-report.dto";
import { ApproveReportDto } from "./dto/approve-report.dto";
import { GetEstimateDto } from "./dto/get-estimate.dto";
import { AdminGuard } from "../auth/guards/admin.guard";
import { Report } from "./entities/report.entity";

@Controller("reports")
export class ReportsController {
  constructor(private readonly _reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @DataSerializer(ReportDto)
  public createReport(
    @CurrentUser() user: User,
    @Body() body: CreateReportDto,
  ): Promise<Report> {
    return this._reportsService.create(user, body);
  }

  @Patch("/:id")
  @UseGuards(AdminGuard)
  public approveReport(
    @Param("id") reportId: string,
    @Body() body: ApproveReportDto,
  ): Promise<Report> {
    return this._reportsService.changeApproval(reportId, body.approved);
  }

  @Get()
  public getEstimate(@Query() query: GetEstimateDto) {
    return this._reportsService.estimate(query);
  }
}
