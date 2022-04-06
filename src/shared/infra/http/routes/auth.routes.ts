import { Router } from "express";

import { RefreshTokenController } from
  "../../../../modules/accounts/useCases/refreshToken/RefreshTokenController";
import { AuthUserController } from
  "../../../../modules/accounts/useCases/authUser/AuthUserController";

const authRoutes = Router();

const authUserController = new AuthUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post("/sessions", authUserController.handle);
authRoutes.post("/refresh-token", refreshTokenController.handle);

export { authRoutes };
