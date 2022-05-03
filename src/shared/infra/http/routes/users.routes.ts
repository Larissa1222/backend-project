import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateUserController } from
  "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateAvatarController } from
  "../../../../modules/accounts/useCases/updateUserAvatar/UpdateAvatarController";
import { ProfileUserController } from
  "../../../../modules/accounts/useCases/profileUser/ProfileUserController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

//feito por patch pois so altera 1 informacao
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle)

export { usersRoutes };
