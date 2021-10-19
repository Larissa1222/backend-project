import { Category } from "./../../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./../ICategoriesRepository";



class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]; 
  private static INSTANCE: CategoriesRepository;

  private constructor(){
    this.categories = [];
  }

  public static getInstance(){
    if(!CategoriesRepository.INSTANCE){
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE
  }

  create({name, description}: ICreateCategoryDTO){
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() })

    this.categories = [...this.categories, category];
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category{
    const category = this.categories.find(category => category.name === name);
    return category; // retornando assim, para ser didático, o melhor seria retornar direto o find.
  }
}

export { CategoriesRepository };


// A classe/camada Repository, é responsável por toda a manipulação de dados da aplicação
// É responsável por fazer o acesso ao banco de dados, operações com banco de dados