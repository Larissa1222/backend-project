import { getRepository, Repository } from "typeorm";

import {
  ISpecificationDTO,
  ISpecificationsRepository,
} from "modules/cars/repositories/ISpecificationsCategory";
import { Specifications } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specifications>;

  constructor() {
    this.repository = getRepository(Specifications);
  }
  async create({ name, description }: ISpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
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
