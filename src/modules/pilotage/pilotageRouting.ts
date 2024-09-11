import { Router } from "express";
import passport from "passport";
import { getPilotageController } from "./controllers/getPilotageController";
import { getFilesInPilotageController } from "./controllers/getFilesInPilotageController";
import { updateStatusController } from "./controllers/updateStatusController";

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
