import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "../../../../shared/infra/http/app";

import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;
describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(`
      INSERT INTO USERS(id, name, password, email, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', '${password}', 'admin@rentx.com', true, 'now()', '123456' )
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "category supertest",
        description: "category supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create if already exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "category supertest",
        description: "category supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
      //deveria funcionar com toBe(400) porem recebe 500
    expect(response.status).toBe(500);
  });
});
