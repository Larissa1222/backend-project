import { Category } from "../../infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

/**
 * Foi necessario criar esse arquivo pois se implementasse o 
 * categoriesRepository comum, teria de integrar com os demais useCases
 * de categories, e o teste unitário nao tem funcao de testar integracoes
 * portanto, é criado um repositorio em memoria
 */

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });
    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
