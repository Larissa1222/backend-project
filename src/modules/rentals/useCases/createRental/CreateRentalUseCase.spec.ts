import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../../rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "123567",
      car_id: "1924875",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("shouldn't be able to create a new rental if user has another in process", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123567",
        car_id: "1924875",
        expected_return_date: new Date(),
      });
     await createRentalUseCase.execute({
        user_id: "123567",
        car_id: "8044498",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError)

  });

  it("shouldn't be able to create a new rental if car is in use", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123567",
        car_id: "1924875",
        expected_return_date: new Date(),
      });
      await createRentalUseCase.execute({
        user_id: "1237",
        car_id: "1924875",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError)

  });

});
