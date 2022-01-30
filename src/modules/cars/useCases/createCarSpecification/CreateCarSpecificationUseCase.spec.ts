import { AppError } from "../../../../shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepository
    );
  });

  it("shouldnt be able to add a new specification into non-existent car", async () => {
    await expect(
      createCarSpecificationUseCase.execute({
        car_id: "1234",
        specifications_id: ["56789"],
      })
    ).rejects.toEqual(new AppError("Car doesnt exists!"));
  });

  it("should be able to add a new specification into car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car specification test",
      description: "car specification test description",
      daily_rate: 150,
      license_plate: "IWK-2439",
      fine_amount: 70,
      brand: "car brand",
      category_id: "car category",
    });

    const specification = await specificationsRepository.create({
      description: "specification test",
      name: "specification name",
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
