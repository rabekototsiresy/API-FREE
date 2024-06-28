import { Router } from "express";
import passport from "passport";
import { getAllOrdController } from "./getAllOrdController";
import { addOrdoController } from "./addOrdoController";
import { updateOrdoController } from "./updateOrdoController";
import { deleteOrdoController } from "./deleteOrdoController";


export const OrdonnancementRoute: Router = Router();

OrdonnancementRoute.route("").get(
  passport.authenticate("jwt", { session: false }),
  getAllOrdController
);

OrdonnancementRoute.route("").post(
  passport.authenticate("jwt", { session: false }),
  addOrdoController
);

OrdonnancementRoute.route("/:id").put(
  passport.authenticate("jwt", { session: false }),
  updateOrdoController
);

OrdonnancementRoute.route("/:id").delete(
  passport.authenticate("jwt", { session: false }),
  deleteOrdoController
);

