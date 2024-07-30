import { Router } from "express";
import passport from "passport";
import { getPilotageController } from "./getPilotageController";
import { getFilesInPilotageController } from "./getFilesInPilotageController";
import { updateStatusController } from "./updateStatusController";

export const PilotageRoute: Router = Router();

PilotageRoute.route("").get(
  passport.authenticate("jwt", { session: false }),
  getPilotageController
);

PilotageRoute.route("/files/:id").get(
  passport.authenticate("jwt", { session: false }),
  getFilesInPilotageController
);

PilotageRoute.route("/files/change-status").put(
  passport.authenticate("jwt", { session: false }),
  updateStatusController
);
