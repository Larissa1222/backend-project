import { container } from "tsyringe";
import { Request, Response } from "express";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { token } = request.query;
      const { password } = request.body;
      const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase);
  
      const tokenString = token.toString();

      await resetPasswordUserUseCase.execute(tokenString, password);
      return response.send();
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }

  }
}
export { ResetPasswordUserController }