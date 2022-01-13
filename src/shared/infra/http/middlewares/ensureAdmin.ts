import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.body;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  console.log({ user });
  if (!user.isAdmin) {
    throw new AppError("User isnt admin!");
  }
  return next();
}