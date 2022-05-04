import { inject, injectable } from "tsyringe";

import { IUserResponseDTO, UserMap } from "../../mapper/UserMap";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);
    
    //UserMap pra nao retornar dados sensiveis do usuario na requisicao
    return UserMap.toDTO(user);
  }
}