import { Router } from "express";
import { AuthRoute } from "./modules/auth/authRouting";
import { UserRoute } from "modules/user";
import { ArticleRouter } from "modules/article";
import { OrdonnancementRoute } from "modules/ordonnacement";
import { PilotageRoute } from "./modules/pilotage";
import { MspRoute } from "modules/msp";

export const AppRoute: Router = Router();

AppRoute.use("/auth", [AuthRoute]);
AppRoute.use("/user", [UserRoute]);
AppRoute.use("/article", [ArticleRouter]);
AppRoute.use("/ordonnancement", [OrdonnancementRoute]);
AppRoute.use("/pilotage", [PilotageRoute]);
AppRoute.use("/msp", [MspRoute]);
