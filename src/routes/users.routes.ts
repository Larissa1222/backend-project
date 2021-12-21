import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateAvatarController";
import uploadConfig from '../config/upload';
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();

usersRoutes.post("/", createUserController.handle);

//feito por patch pois so altera 1 informacao
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
);

export { usersRoutes };
