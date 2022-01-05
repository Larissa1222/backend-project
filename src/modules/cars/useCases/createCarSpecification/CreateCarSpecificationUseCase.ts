import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";

import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsCategory";
import { Car } from "../../infra/typeorm/entities/Car";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}
  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);
    if (!carExists) {
      throw new AppError("Car doesnt exists!");
    }
    const specification = await this.specificationRepository.findByIds(
      specifications_id
    );
    carExists.specifications = specification;
    await this.carsRepository.create(carExists);

    return carExists;
  }
}
export { CreateCarSpecificationUseCase };
