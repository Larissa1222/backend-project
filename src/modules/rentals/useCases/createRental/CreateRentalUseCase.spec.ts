import dayjs from "dayjs";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../../rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory
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
    const rental = await createRentalUseCase.execute({
      user_id: "123567",
      car_id: "1924875",
      expected_return_date: dayAdd48h,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("shouldn't be able to create a new rental if user has another in process", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123567",
        car_id: "1924875",
        expected_return_date: dayAdd48h,
      });
      await createRentalUseCase.execute({
        user_id: "123567",
        car_id: "8044498",
        expected_return_date: dayAdd48h,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create a new rental if car is in use", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123567",
        car_id: "1924875",
        expected_return_date: dayAdd48h,
      });
      await createRentalUseCase.execute({
        user_id: "1237",
        car_id: "1924875",
        expected_return_date: dayAdd48h,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create a new rental for less than 24hours", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123567",
        car_id: "1924875",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
