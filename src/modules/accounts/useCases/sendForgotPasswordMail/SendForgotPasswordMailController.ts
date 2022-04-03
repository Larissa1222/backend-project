import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body;
      const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase);
      await sendForgotPasswordMailUseCase.execute(email);
      return response.send();
    } catch (error) {
      
    }
  }
}

export { SendForgotPasswordMailController }
