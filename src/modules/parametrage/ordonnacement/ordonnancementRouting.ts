import { Router } from "express";
import passport from "passport";
import { getAllOrdController } from "./controllers/getAllOrdController";
import { addOrdoController } from "./controllers/addOrdoController";
import { updateOrdoController } from "./controllers/updateOrdoController";
import { deleteOrdoController } from "./controllers/deleteOrdoController";
import { getDayToClearDbPPController } from "./controllers/getDayToClearDbPPController";

export const OrdonnancementRoute: Router = Router();

OrdonnancementRoute.route("/ordonnancement").get(
  passport.authenticate("jwt", { session: false }),
  getAllOrdController
);

OrdonnancementRoute.route("/ordonnancement").post(
  passport.authenticate("jwt", { session: false }),
  addOrdoController
);

OrdonnancementRoute.route("/ordonnancement/:id").put(
  passport.authenticate("jwt", { session: false }),
  updateOrdoController
);

OrdonnancementRoute.route("/ordonnancement/:id").delete(
  passport.authenticate("jwt", { session: false }),
  deleteOrdoController
);
OrdonnancementRoute.route("/ordonnancement/clean-db-day").get(
  passport.authenticate("jwt", { session: false }),
  getDayToClearDbPPController
);
