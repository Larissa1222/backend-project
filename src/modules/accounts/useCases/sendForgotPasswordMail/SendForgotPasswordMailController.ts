import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body;
      const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase);
      await sendForgotPasswordMailUseCase.execute(email);
      return response.send();
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export { SendForgotPasswordMailController }
