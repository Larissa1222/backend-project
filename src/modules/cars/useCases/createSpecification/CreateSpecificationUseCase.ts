import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { SpecificationsRepository } from "../../../../modules/cars/infra/typeorm/repositories/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists");
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
