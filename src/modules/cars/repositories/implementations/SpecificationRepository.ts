import { Specification } from "../../entities/Specification";
import { ISpecificationDTO, ISpecificationRepository } from "../ISpecificationCategory";

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];
  
  private static INSTANCE: SpecificationRepository;

  private constructor(){
    this.specifications = [];
  }

  public static getInstance(){
    if(!this.INSTANCE){
      this.INSTANCE = new SpecificationRepository();
    }

    return this.INSTANCE;
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(specification => specification.name === name);
    return specification;

  }

  create({ name, description }: ISpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, { name, description});

    this.specifications = [ ...this.specifications, specification ];
  }
}

export { SpecificationRepository };

