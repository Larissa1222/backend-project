import { getRepository, Repository } from "typeorm";

import {
  ICreateUserTokenDTO,
  IUsersTokensRepository,
} from "modules/accounts/repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });
    await this.repository.save(userToken);
    
    return userToken;
  }

  async findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    return this.repository.findOne({
      user_id,
      refresh_token
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
export { UsersTokensRepository };
