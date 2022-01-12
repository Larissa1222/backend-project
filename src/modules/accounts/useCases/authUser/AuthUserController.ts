import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthUserUseCase } from "./AuthUserUseCase";

class AuthUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { password, email } = request.body;

      const authUserUseCase = container.resolve(AuthUserUseCase);

      const token = await authUserUseCase.execute({ password, email });

      return response.json(token);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
export { AuthUserController };
