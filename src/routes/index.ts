import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationRoutes } from './specification.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationRoutes);
routes.use('/users', usersRoutes);
//passado direto pra n ficar como /sessions
routes.use(authRoutes);

export { routes };