import { CategoriesRepository } from "../repositories/implementations/CategoriesRepository";
import { SpecificationRepository } from "../repositories/implementations/SpecificationRepository";
import { CreateCategoryController } from "./createCategory/CreateCategoryController";
import { CreateCategoryUseCase } from "./createCategory/CreateCategoryUseCase";
import { CreateSpecificationController } from "./createSpecification/CreateSpecificationController";
import { CreateSpecificationUseCase } from "./createSpecification/CreateSpecificationUseCase";
import { ImportCategoryController } from "./importCategories/ImportCategoryController";
import { ImportCategoryUseCase } from "./importCategories/ImportCategoryUseCase";
import { ListCategoriesController } from "./listCategories/ListCategoriesController";
import { ListCategoriesUseCase } from "./listCategories/ListCategoriesUseCase";

export default(): CreateCategoryController => {

  const categoriesRepository = new CategoriesRepository;
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  const createCategoryController = new CreateCategoryController(createCategoryUseCase);
  return createCategoryController;
}

const categoryRepository = new CategoriesRepository;
const specificationRepository = SpecificationRepository.getInstance();


const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository);
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { 
  createSpecificationController,
  importCategoryController,
  listCategoriesController
};
