import { getRepository, Repository } from "typeorm";
import { Specifications } from "../../entities/Specification";
import { ISpecificationDTO, ISpecificationsRepository } from "../ISpecificationsCategory";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specifications>  ;

  constructor(){
    this.repository = getRepository(Specifications);
  }
  async create({ name, description }: ISpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name
    });
    await this.repository.save(specification);
  }
  
  async findByName(name: string): Promise<Specifications> {
    const specification = this.repository.findOne({
      name,
    });
    return specification;

  }

}

export { SpecificationsRepository };

