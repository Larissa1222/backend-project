import { UserTokens } from "modules/accounts/infra/typeorm/entities/UserTokens";
import { ICreateUserTokenDTO, IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  userTokens: UserTokens[] = [];
  create({ user_id, expires_date, refresh_token, }: ICreateUserTokenDTO): Promise<UserTokens> {
    throw new Error("Method not implemented.");
  }
  findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    throw new Error("Method not implemented.");
  }

}
export { UsersTokensRepositoryInMemory }
