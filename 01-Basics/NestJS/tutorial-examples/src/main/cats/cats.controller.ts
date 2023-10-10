import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { Response } from "express";

import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { CatsService } from "./cats.service";
import { TransformInterceptor } from "src/shared/interceptors/transform/transform.interceptor";

@Controller("cats")
export class CatsController {
  constructor(private readonly _catsService: CatsService) {}

  @Post()
  @HttpCode(204)
  @Header("Cache-Control", "none")
  public async create(
    @Res() res: Response,
    @Body() createCatDto: CreateCatDto,
  ) {
    return this._catsService.create(createCatDto);
  }

  @Get()
  public async findAll() {
    try {
      await this._catsService.findAll();
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "This is a custom message",
        },
        HttpStatus.FORBIDDEN,
        {
          cause: err,
          description: "custom description",
        },
      );
    }
    return this._catsService.findAll();
  }

  @Get(":id")
  // @UseFilters(new HttpExceptionFilter())
  @UseInterceptors(new TransformInterceptor())
  findOne(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    catId: number,
  ): string {
    console.log(catId);
    return `This action returns a #${catId} cat`;
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return `This action removes a #${id} cat`;
  }
}
