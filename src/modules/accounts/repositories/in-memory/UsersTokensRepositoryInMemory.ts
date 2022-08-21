import { UserTokens } from "../../infra/typeorm/entities/UserTokens";
import { ICreateUserTokenDTO, IUsersTokensRepository } from "../IUsersTokensRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({ user_id, expires_date, refresh_token, }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    });
    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find(ut => ut.user_id === user_id && ut.refresh_token === refresh_token);
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find(ut => ut.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find(ut => ut.refresh_token === refresh_token);
  }
}
