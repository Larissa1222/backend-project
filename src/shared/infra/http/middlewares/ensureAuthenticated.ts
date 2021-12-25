import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  //autenticação pelo postman, na parte de authorization bearer token
  //nisso, vem uma string do tipo Bearer 489dasji2o3j90a
  //esse split vai separar o bearer na posição 0, e o token na posição 1
  const [, token] = authHeader.split(" ");

  try {
    //verificar se é um token valido
    //token do auth user usecase
    //se o token for errado cai no catch
    const { sub: user_id } = verify(
      token,
      "d652eeeea9a382e2b37ad73e0a66b131"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("User does not exists!", 401);
    }
    //foi necessario sobrescrever a tipagem
    //do express, para poder repassar o id
    //no request do proprio express
    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
