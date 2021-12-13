import { container } from "tsyringe";

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationCategory";
import { SpecificationRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository';


//ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

//ISpecificationRepository
container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
);