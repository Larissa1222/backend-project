import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

export class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const images = request.files as IFiles[];

      const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

      const images_name = images.map((file) => file.filename);

      await uploadCarImageUseCase.execute({
        car_id: id,
        images_name,
      });
      return response.status(201).send();
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
