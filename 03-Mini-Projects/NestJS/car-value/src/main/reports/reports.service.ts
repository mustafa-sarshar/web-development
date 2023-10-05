import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Report } from "./entities/report.entity";
import { CreateReportDto } from "./dto/create-report.dto";
import { User } from "../users/entities/user.entity";
import { GetEstimateDto } from "./dto/get-estimate.dto";

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly _reportRepository: Repository<Report>,
  ) {}

  public create(user: User, reportDto: CreateReportDto): Promise<Report> {
    const reportNew: Report = this._reportRepository.create(reportDto);
    reportNew.user = user;

    return this._reportRepository.save(reportNew);
  }

  public async changeApproval(
    reportId: string,
    approve: boolean,
  ): Promise<Report> {
    const reportFound: Report = await this._reportRepository.findOne({
      where: { _id: parseInt(reportId) },
    });

    if (!reportFound) {
      throw new NotFoundException("report not found");
    }

    reportFound.approved = approve;
    return this._reportRepository.save(reportFound);
  }

  public estimate({ make, model, year, mileage, lng, lat }: GetEstimateDto) {
    return this._reportRepository
      .createQueryBuilder()
      .select("AVG(price)", "price")
      .where("make = :make", { make })
      .andWhere("model = :model", { model })
      .andWhere("lng - :lng BETWEEN -5 AND 5", { lng })
      .andWhere("lat - :lat BETWEEN -5 AND 5", { lat })
      .andWhere("year - :year BETWEEN -3 AND 3", { year })
      .andWhere("approved IS TRUE")
      .orderBy("ABS(mileage - :mileage)", "DESC")
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
