import { container } from "tsyringe";

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationsCategory";
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';


//ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

//ISpecificationRepository
container.registerSingleton<ISpecificationRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);