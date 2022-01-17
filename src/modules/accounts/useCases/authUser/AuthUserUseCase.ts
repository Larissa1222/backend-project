import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";

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
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
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
      { subject: user.id, expiresIn: "1d" },
      "d652eeeea9a382e2b37ad73e0a66b131"
    );

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
    return tokenReturn;
  }
}

export { AuthUserUseCase };
