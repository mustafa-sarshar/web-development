import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

import { AppModule } from "../src/app.module";

describe("Authentication System", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("it handles the sign up request", () => {
    const email: string = "user4@mail.com";
    const password: string = "user4@123@ABC";

    return request(app.getHttpServer())
      .post("/auth/sign-up")
      .send({
        email,
        password,
      })
      .expect(201)
      .then((res: any) => {
        const { _id, email } = res.body;

        expect(_id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it("Sign up a new user and then get the currently logged in user", async () => {
    const email: string = "userNew@mail.com";
    const password: string = "userNew@123@ABC";

    const res: request.Response = await request(app.getHttpServer())
      .post("/auth/sign-up")
      .send({
        email,
        password,
      })
      .expect(201);

    const cookie: string[] = res.get("Set-Cookie");

    const { body } = await request(app.getHttpServer())
      .get("/auth/whoami")
      .set("Cookie", cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
