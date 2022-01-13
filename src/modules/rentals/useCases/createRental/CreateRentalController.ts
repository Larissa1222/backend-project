import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      console.log("request: ", request);
      const { car_id, expected_return_date } = request.body;
      const { id } = request.user;
      
      // const newId = id.toString();
      console.log("id objeto", {id});
      const createRentalUseCase = container.resolve(CreateRentalUseCase);

      const rental = await createRentalUseCase.execute({
        user_id: id,
        car_id,
        expected_return_date,
      });
      return response.status(201).json(rental);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export { CreateRentalController };

// "user_id": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiM2JmOGI5MDctN2Q2NC00NjMxLTkyYTQtZmE3ZjM1MzdjNDZlIiwiZXhwaXJlc0luIjoiMWQiLCJpYXQiOjE2NDIwMTIwNzV9.iaRJWSqouhYslZLH4w1F9Fj0wJqxg4JQTqOpmucahKw"