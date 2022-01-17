import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

//Agora inutiliza o index
class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;
      //Injecao de dependencia automatica
      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

      await createCategoryUseCase.execute({ name, description });

      // Sempre que for enviar um STATUS sem mensagem, usar o metodo .send()
      return response.status(201).send(); 
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export { CreateCategoryController };
