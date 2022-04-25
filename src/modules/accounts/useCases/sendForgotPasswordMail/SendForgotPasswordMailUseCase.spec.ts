import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/MailProviderInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { AppError } from "../../../../shared/errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("SendForgotPasswordMailUseCase", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send forgot password mail to user", async () =>  {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "628721",
      email: "testecriacao@rentx.com",
      name: "teste name",
      password: "password1234"
    });
    await sendForgotPasswordMailUseCase.execute("testecriacao@rentx.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user doesn't exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("falha@rentx.com")
    ).rejects.toEqual(new AppError("User doesn't exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "628726",
      email: "testecriacao2@rentx.com",
      name: "teste name2",
      password: "password1234"
    });
    await sendForgotPasswordMailUseCase.execute("testecriacao2@rentx.com");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
