import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      //Brand category ou name enviado por params nao por body
      const { brand, category_id, name } = request.query;
      const listAvailableCarsUseCase = container.resolve(
        ListAvailableCarsUseCase
      );

      /**
       * Colocar o as string pq assim força vir como string 
       * caso contrário pode vir um tipo querystring
       */
      
      const cars = await listAvailableCarsUseCase.execute({
        brand: brand as string,
        name: name as string,
        category_id: category_id as string,
      });
      return response.json(cars);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export { ListAvailableCarsController };