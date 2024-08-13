import { Router } from "express";
import passport from "passport";

import { getRejetMspController } from "../msp/getRejetMspController";
import { handleMspController } from "./handleMspController";

export const MspRoute: Router = Router();

MspRoute.route("/rejet").get(
  passport.authenticate("jwt", { session: false }),
  getRejetMspController
);

MspRoute.route("/cancel-print").post(
  passport.authenticate("jwt", { session: false }),
  handleMspController
);
