import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user;
      const { id } = request.params;
  
      const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);
      const rental = await devolutionRentalUseCase.execute({ id, user_id });
  
      return response.status(200).json(rental);
      
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export { DevolutionRentalController };
