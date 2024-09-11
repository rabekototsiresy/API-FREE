import { Router } from "express";
import passport from "passport";
import { razController } from "./razController";

export const RazRoute: Router = Router();

RazRoute.route("/raz").get(
  passport.authenticate("jwt", { session: false }),
  razController
);
