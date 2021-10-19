import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor( private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): Response{
    try {
      const { name, description } = request.body;
  
      this.createCategoryUseCase.execute({name, description});
  
      return response.status(201).send(); // Sempre que for enviar um STATUS sem mensagem, usar o metodo .send()
    } catch (error) {
      return response.status(500).json({error: error.message})
    } 

  }
}

export { CreateCategoryController };