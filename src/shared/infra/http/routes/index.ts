import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalsRoutes } from "./rentals.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

routes.use("/categories", categoriesRoutes);
routes.use("/specifications", specificationsRoutes);
routes.use("/users", usersRoutes);
//passado direto pra n ficar como /sessions
routes.use("/cars", carsRoutes);
routes.use("/rentals", rentalsRoutes);
routes.use(authRoutes);

export { routes };
