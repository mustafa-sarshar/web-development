import { Injectable } from "@nestjs/common";

import { Cat } from "./entities/cat.entity";

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  public create(cat: Cat) {
    this.cats.push(cat);
  }

  public findAll(): Cat[] {
    return this.cats;
  }
}
