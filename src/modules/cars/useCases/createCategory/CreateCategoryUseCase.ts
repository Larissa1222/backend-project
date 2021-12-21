import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
//Dessa forma, o tsrynge vai ser responsavel a inicializar a instância do repositório
//entao nao vai ser mais usado o new categoriesrepository
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository){}

  async execute({description, name}: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if(categoryAlreadyExists){
      throw new AppError("Category already exists");
    }

    this.categoriesRepository.create({name, description});
  }
}

export { CreateCategoryUseCase };