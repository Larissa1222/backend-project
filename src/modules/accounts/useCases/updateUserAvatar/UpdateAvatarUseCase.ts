/*/
adc coluna d avatar na tabela d users
refatorar usuario com coluna avatar
configuracao upload multer
criar regra de negocio do upload (usuario tem de estar autenticado)
criar controller
/*/

import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}
@injectable()
class UpdateAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    //Para salvar somente o avatar mais recente do usuario
    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }
    await this.storageProvider.save(avatar_file, "avatar");

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}
export { UpdateAvatarUseCase };
