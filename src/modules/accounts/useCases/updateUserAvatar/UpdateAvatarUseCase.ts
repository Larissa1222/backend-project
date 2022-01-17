/*/
adc coluna d avatar na tabela d users
refatorar usuario com coluna avatar
configuracao upload multer
criar regra de negocio do upload (usuario tem de estar autenticado)
criar controller
/*/

import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}
@injectable()
class UpdateAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    //Para salvar somente o avatar mais recente do usuario
    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }
    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}
export { UpdateAvatarUseCase };
