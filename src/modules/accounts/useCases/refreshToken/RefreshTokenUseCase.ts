import { inject, injectable } from "tsyringe";
import { verify, sign } from "jsonwebtoken";

import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";

import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    // 
    /**
     * Decode vai verificar o token, a secret e tbm necessario
     * a criação de interface pra acessar o .subject
     * e pegar o userId
     */
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndToken(user_id, token);

    if(!userToken) {
      throw new AppError("Refresh Token doesnt exists!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub, 
      expiresIn: auth.expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      expires_date: this.dateProvider.addDays(auth.expires_refresh_token_days),
      refresh_token,
      user_id
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
