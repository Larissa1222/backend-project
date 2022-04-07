import { AppError } from "../../../../shared/errors/AppError";

import { ICreateUserDTO } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthUserUseCase } from "./AuthUserUseCase";

import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/DayjsDateProvider";

let authUserUseCase: AuthUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    
    authUserUseCase = new AuthUserUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });
  it("should be able authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "teste",
      email: "teste@email.com",
      password: "qwertyui",
      driver_license: "555555",
    };
    await createUserUseCase.execute(user);

    const result = await authUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a nonexistent user", async () => {
    await expect(
      authUserUseCase.execute({
        email: "fake@email.com",
        password: "qwertyui",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect."));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "888888",
      email: "teste@teste.com",
      password: "qawsedrf",
      name: "User Test Error",
    };
    await createUserUseCase.execute(user);

    await expect(
      authUserUseCase.execute({
        email: user.email,
        password: "fon",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect."));
  });
});
