import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  public getRootRoute() {
    return "Hi there!";
  }
}
