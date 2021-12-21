// https://www.notion.so/ESLint-e-Prettier-Trilha-Node-js-d3f3ef576e7f45dfbbde5c25fa662779#340924d1619d48ec8e8220569f298616 NOTION DOC TO USE PRETTIER AND ESLINT

import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "./database";

import "./shared/container";

import { AppError } from "./errors/AppError";
import { routes } from "./routes/index";
import swaggerFile from "./swagger.json";

const app = express();
const port = 3333;

app.use(express.json());

// SWAGGER INIT
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// aqui passamos o categoriesRouter como argumento para o app.use, assim nossas rotas ficam expostas para serem consumidas
// como categories é o nome do dominio principal dessas rotas, podemos passar ela como argumento direto do app use, e tudo que vier a partir dela vai no router
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      response.status(err.statusCode).json({
        message: err.message,
      });

    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error ${err.message}`,
    });
  }
);

app.listen(port, () => {
  console.log(`APP LISTENING AT http://localhost:${port}`);
});
