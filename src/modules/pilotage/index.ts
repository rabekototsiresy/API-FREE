import { Router } from "express";
import passport from "passport";
import { getPilotageController } from "./getPilotageController";
import { getFilesInPilotageController } from "./getFilesInPilotageController";

export const PilotageRoute: Router = Router();

PilotageRoute.route("").get(
  passport.authenticate("jwt", { session: false }),
  getPilotageController
);

PilotageRoute.route("/files/:id").get(
  passport.authenticate("jwt", { session: false }),
  getFilesInPilotageController
);


