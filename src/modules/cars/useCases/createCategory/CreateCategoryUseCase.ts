import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

/**
 *  [X] => Definir o tipo de retorno
 *  [X] => Alterar o retorno do erro (usamos o throw new Error())
 *  [X] => Acessar o repositório
 */

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository){}

  execute({description, name}: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if(categoryAlreadyExists){
      throw new Error("Category already exists")
    }

    this.categoriesRepository.create({name, description});
  }
}

export { CreateCategoryUseCase };