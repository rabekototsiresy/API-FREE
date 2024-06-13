import { Router } from "express";
import { loginController } from "./controllers/loginController";
import { registerController } from "./controllers/registerController";
import { validate } from "common/middlewares/formValidation";
import UserSchema from "common/schemas/UserSchema";
import passport from "passport";
import { updatePasswordController } from "./controllers/updatePasswordController";

export const AuthRoute : Router = Router();

AuthRoute.route('/login').post(validate(UserSchema.login),loginController)
AuthRoute.route('/register').post(validate(UserSchema.register),registerController)
AuthRoute.route("/change-password").patch(
    passport.authenticate("jwt", { session: false }),
    updatePasswordController
);
