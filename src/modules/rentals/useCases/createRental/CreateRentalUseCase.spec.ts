import dayjs from "dayjs";

import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../../rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/DayjsDateProvider";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd48h = dayjs().add(2, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name test",
      description: "Car description test",
      daily_rate: 50,
      license_plate: "ADI-1278",
      fine_amount: 60,
      brand: "Car brand test",
      category_id: "Car category id test",
    });
    const rental = await createRentalUseCase.execute({
      user_id: "123567",
      car_id: car.id,
      expected_return_date: dayAdd48h,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("shouldn't be able to create a new rental if user has another in process", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: '123567',
      car_id: '66666',
      expected_return_date: dayAdd48h,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: "123567",
        car_id: '55555',
        expected_return_date: dayAdd48h,
      })
    ).rejects.toEqual(new AppError("There's a rental already open to this user"));
  });

  it("shouldn't be able to create a new rental if car is in use", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: '0000',
      car_id: '1924875',
      expected_return_date: dayAdd48h,
    });
    await expect(
    createRentalUseCase.execute({
        user_id: "1237",
        car_id: "1924875",
        expected_return_date: dayAdd48h,
      })
    ).rejects.toEqual(new AppError("Car is unavailable!"));
  });

  it("shouldn't be able to create a new rental for less than 24hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123567",
        car_id: "1924875",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Rental above minimun hours"));
  });
});
