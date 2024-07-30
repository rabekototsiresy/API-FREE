import { Router } from "express";
import passport from "passport";
import { getAllArticleController } from "./getAllArticleController";
import { validate } from "common/middlewares/formValidation";
import { updateArticleController } from "./updateArticleController";
import { moveCsvToDirControoller } from "./moveCsvToDirControoller";
import {pliGeneriqueSchema} from "common/schemas/PGSchema";
import { pliGeneriqueController } from "./pliGeneriqueController";


export const ArticleRouter: Router = Router();
ArticleRouter.route("").get(
  passport.authenticate("jwt", { session: false }),
  getAllArticleController
);

ArticleRouter.route("/:id").put(
  passport.authenticate("jwt", { session: false }),
  updateArticleController
);
ArticleRouter.route("/move-csv").get(
  passport.authenticate("jwt", { session: false }),
  moveCsvToDirControoller
);
ArticleRouter.route("/pli-generique").post(
  passport.authenticate("jwt", { session: false }),
  validate(pliGeneriqueSchema),
  pliGeneriqueController
);