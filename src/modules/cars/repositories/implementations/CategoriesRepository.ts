import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./../ICategoriesRepository";


class CategoriesRepository implements ICategoriesRepository {
  private static INSTANCE: CategoriesRepository;

  private repository: Repository<Category>;

  constructor(){
    this.repository = getRepository(Category);
  }

  // public static getInstance(){
  //   if(!CategoriesRepository.INSTANCE){
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }

  //   return CategoriesRepository.INSTANCE
  // }

  async create({name, description}: ICreateCategoryDTO): Promise<void> {
    // const category = new Category();
    // Object.assign(category, { name, description, created_at: new Date() })
    const category = this.repository.create({
      description,
      name,
    });
    
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories
  }

  async findByName(name: string): Promise<Category>{
    //select * from categories where name = name - assim q funfa findOne
    const category = await this.repository.findOne({ name });
    return category; 
  }
}

export { CategoriesRepository };
