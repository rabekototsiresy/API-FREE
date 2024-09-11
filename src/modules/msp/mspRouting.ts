import { Router } from "express";
import passport from "passport";

import { getRejetMspController } from "./controllers/getRejetMspController";
import { handleMspController } from "./controllers/handleMspController";

export const MspRoute: Router = Router();

MspRoute.route("/rejet").get(
  passport.authenticate("jwt", { session: false }),
  getRejetMspController
);

MspRoute.route("/cancel-print").post(
  passport.authenticate("jwt", { session: false }),
  handleMspController
);
