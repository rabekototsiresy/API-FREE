import { Router } from "express";
import { AuthRoute } from "./modules/auth/authRouting";
import { UserRoute } from "modules/user";
import { ArticleRouter } from "modules/article";
import { OrdonnancementRoute } from "modules/parametrage/ordonnacement";
import { MspRoute } from "modules/msp";
import { PilotageRoute } from "modules/pilotage";
import { RazRoute } from "modules/parametrage/raz";
import { TraitementRoute } from "modules/traitement";

export const AppRoute: Router = Router();

AppRoute.use("/auth", [AuthRoute]);
AppRoute.use("/user", [UserRoute]);
AppRoute.use("/article", [ArticleRouter]);
AppRoute.use("/parametrage", [RazRoute, OrdonnancementRoute]);
AppRoute.use("/pilotage", [PilotageRoute]);
AppRoute.use("/msp", [MspRoute]);
AppRoute.use("/traitement", [TraitementRoute]);
