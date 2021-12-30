import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able list all availables cars", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car available",
      description: "car description",
      daily_rate: 60.5,
      license_plate: "ONR-5883",
      fine_amount: 20,
      brand: "Car brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car1]);
  });

  it("should be able to list all cars by brand", async () => {
    const car2 = await carsRepositoryInMemory.create({
      name: "Car available",
      description: "car description",
      daily_rate: 60.5,
      license_plate: "ONR-5883",
      fine_amount: 20,
      brand: "car1_brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "car1_brand",
    });
    expect(cars).toEqual([car2]);
  });

  it("should be able to list all cars by name", async () => {
    const car3 = await carsRepositoryInMemory.create({
      name: "car name name",
      description: "car description",
      daily_rate: 60.5,
      license_plate: "ONR-5883",
      fine_amount: 20,
      brand: "car brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "car name name",
    });
    expect(cars).toEqual([car3]);
  });

  it("should be able to list all cars by category_id", async () => {
    const car4 = await carsRepositoryInMemory.create({
      name: "car name",
      description: "car description",
      daily_rate: 60.5,
      license_plate: "ONR-5883",
      fine_amount: 20,
      brand: "car brand",
      category_id: "c854a411-7a3c-4ff8-86c1-5e7600373677",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "c854a411-7a3c-4ff8-86c1-5e7600373677",
    });
    expect(cars).toEqual([car4]);
  });
});
