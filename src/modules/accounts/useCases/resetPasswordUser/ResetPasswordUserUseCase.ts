import { AppError } from "../../../../shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

@injectable()
class ResetPasswordUserUseCase {

  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string, password: string): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token invalid!");
    }
    //Verificar se o token nao ta expirado
    if (this.dateProvider.compareIfBefore(
      userToken.expires_date, this.dateProvider.dateNow())
    ) {
      throw new AppError("Token expired!");
    }
    //Pegar o id do user, criptografar a senha nova
    const user = await this.usersRepository.findById(userToken.user_id);
    
    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
export { ResetPasswordUserUseCase }