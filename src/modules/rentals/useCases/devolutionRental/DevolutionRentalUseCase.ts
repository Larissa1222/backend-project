import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { Rental } from "../../infra/typeorm/entities/Rental";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    const minimun_daily = 1;

    if (!rental) throw new AppError("Rental doesnt exists!");

    //Calculo de diarias
    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );
    //Diaria menor q 1 dia, msm assim sera cobrado 1 dia
    if (daily <= 0) daily = minimun_daily;

    //Pra calcular atraso
    const delay = this.dateProvider.compareInDays(
      this.dateProvider.dateNow(),
      rental.expected_return_date
    );
    let total = 0;
    //Atribui o atraso e a multa ao total a ser recebido
    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
