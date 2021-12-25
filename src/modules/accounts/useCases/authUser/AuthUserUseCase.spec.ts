import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { ICreateUserDTO } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthUserUseCase } from "./AuthUserUseCase";

let authUserUseCase: AuthUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    authUserUseCase = new AuthUserUseCase(userRepositoryInMemory);
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

  it("should not be able to authenticate a nonexistent user", () => {
    expect(async () => {
      const result = await authUserUseCase.execute({
        email: "fake@email.com",
        password: "qwertyui",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "888888",
        email: "teste@teste.com",
        password: "qawsedrf",
        name: "User Test Error",
      };
      await createUserUseCase.execute(user);
      await authUserUseCase.execute({
        email: user.email,
        password: "fon",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
