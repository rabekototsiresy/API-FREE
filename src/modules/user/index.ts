import { Router } from "express";
import passport from "passport";
import { getUserController } from "./getUserController";
import { validate } from "common/middlewares/formValidation";
import UserSchema from "common/schemas/UserSchema";
import { deleteUserController } from "./deleteUserController";
import { updateUserController } from "./updateUserController";
import { registerController } from "modules/auth/controllers/registerController";

export const UserRoute: Router = Router();

UserRoute.route("").get(
  passport.authenticate("jwt", { session: false }),
  getUserController
);

UserRoute.route("").post(
  passport.authenticate("jwt", { session: false }),
  validate(UserSchema.register),
  registerController
);

UserRoute.route("/:id").put(
  passport.authenticate("jwt", { session: false }),
  validate(UserSchema.register),
  updateUserController
);

UserRoute.route("/:id").delete(
  passport.authenticate("jwt", { session: false }),
  deleteUserController
);
