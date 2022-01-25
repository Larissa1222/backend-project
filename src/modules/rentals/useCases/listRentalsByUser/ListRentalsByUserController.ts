import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user;

      const listRentalsByUserUseCase = container.resolve(
        ListRentalsByUserUseCase
      );
      const rentals = await listRentalsByUserUseCase.execute(user_id);

      return response.status(200).json(rentals);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export { ListRentalsByUserController };
