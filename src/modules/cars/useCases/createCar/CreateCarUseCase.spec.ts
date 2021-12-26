import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("CreateCar", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "car name test",
      description: "car description",
      daily_rate: 100,
      license_plate: "SIW-2439",
      fine_amount: 60,
      brand: "car brand",
      category_id: "car category",
    });
    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with license plate already taken", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "car1",
        description: "car description",
        daily_rate: 100,
        license_plate: "SIW-2439",
        fine_amount: 60,
        brand: "car brand",
        category_id: "car category",
      });
      await createCarUseCase.execute({
        name: "car2",
        description: "car description",
        daily_rate: 100,
        license_plate: "SIW-2439",
        fine_amount: 60,
        brand: "car brand",
        category_id: "car category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car with availble true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "car available",
      description: "car description",
      daily_rate: 100,
      license_plate: "JEQ-2439",
      fine_amount: 60,
      brand: "car brand",
      category_id: "car category",
    });
    expect(car.available).toBe(true);
    console.log(car);
  });
});
