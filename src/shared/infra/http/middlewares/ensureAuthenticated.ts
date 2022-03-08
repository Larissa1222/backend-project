import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../../../errors/AppError";
import auth from "../../../../config/auth";

import { UsersTokensRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  const userTokensRepository = new UsersTokensRepository();
  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  /**
   * Autenticação pelo postman, na parte de authorization bearer token 
   * nisso, vem uma string do tipo Bearer 489dasji2o3j90a 
   * esse split vai separar o bearer na posição 0, e o token na posição 1
   */
  const [, token] = authHeader.split(" ");

  try {
    /**
     * Verificar se é um token valido token do
     * auth user usecase se o token for errado cai no catch
     */
    //inserido token do refresh
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token,
    ) as IPayload;

    const user = await userTokensRepository.findByUserIdAndToken(user_id, token);
    /**
     * Foi necessario sobrescrever a tipagem do express, 
     * para poder repassar o id no request do proprio express
     */
    
    request.user = {
      id: user_id,
    };

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }
    return next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
