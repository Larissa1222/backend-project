import multer from "multer";
import { Router } from "express";

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategories/ImportCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

//dessa forma vai funcionar semelhante a um middleware
//e no handle ja tem embutido o request e response
categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAdmin,
  ensureAuthenticated,
  importCategoryController.handle
);

export { categoriesRoutes };

/**
 * Aqui começamos a separar os recursos/dominios da nossa aplicação, e para isso primeiramente importamos o Router do express
 * Em seguida, criamos uma const que receber a chamada de Router, dando então o poder de poder utilizar os verbos com os recursos
 * Após criarmos todas as nossas rotas e suas lógicas, exportamos esse nosso router para que seja usado la no server.ts
 */
