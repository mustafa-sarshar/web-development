import { Controller, Get, Redirect } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller({ host: "localhost" })
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get()
  public getHello(): string {
    return this._appService.getHello();
  }

  @Get("/nestjs")
  @Redirect("https://nestjs.com", 301)
  public redirectToNestJS() {}
}
