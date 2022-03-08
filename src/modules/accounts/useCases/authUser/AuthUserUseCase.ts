import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import auth from "../../../../config/auth";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    //Verificar se usuario existe
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect.");
    }
    /**
     * Verificar se a senha ta correta
     * Comparar a senha criptografada pelo bcrypt com a senha do usuario
     */
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect.");
    }

    /**
     * Gerar jwt
     * Primeiro parametro as info de usuarios nao criticas
     * Segundo parametro uma palavra secreta (essa foi gerada por md5)
     * Terceiro parametro um obj subject do sign, com expiracao d 1 dia
     */

    const token = sign(
      { subject: user.id, expiresIn: auth.expires_in_token },
      auth.secret_token
    );

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });
    /**
     * Nao tem o refresh_token_expires_date pois está sendo feito direto no expires_date
     */
    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: refresh_token,
      expires_date: this.dateProvider.addDays(auth.expires_refresh_token_days),
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };
    return tokenReturn;
  }
}

export { AuthUserUseCase };
