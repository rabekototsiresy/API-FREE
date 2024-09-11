import { Router } from "express";
import passport from "passport";
import { getPoidsController } from "./controllers/getPoidsController";
import { runProcessController } from "./controllers/runProcessController";

export const TraitementRoute: Router = Router();

TraitementRoute.route("/poids").get(
  passport.authenticate("jwt", { session: false }),
  getPoidsController
);
TraitementRoute.route("").post(
  passport.authenticate("jwt", { session: false }),
  runProcessController
);
