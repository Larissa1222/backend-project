import { Router } from 'express';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

import multer from 'multer';
import { importCategoryController } from '../modules/cars/useCases/importCategories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp'
})


categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
})

categoriesRoutes.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
})

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response);
})

export { categoriesRoutes };

/**
 * Aqui começamos a separar os recursos/dominios da nossa aplicação, e para isso primeiramente importamos o Router do express
 * Em seguida, criamos uma const que receber a chamada de Router, dando então o poder de poder utilizar os verbos com os recursos
 * Após criarmos todas as nossas rotas e suas lógicas, exportamos esse nosso router para que seja usado la no server.ts
 */