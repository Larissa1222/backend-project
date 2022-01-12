import { container } from "tsyringe";
import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request;

      const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

      await importCategoryUseCase.execute(file);
      return response.status(201).send();
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export { ImportCategoryController };
