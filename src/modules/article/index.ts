import { Router } from "express";
import passport from "passport";
import { getAllArticleController } from "./getAllArticleController";
import { validate } from "common/middlewares/formValidation";
import { registerController } from "modules/auth/controllers/registerController";
import { updateArticleController } from "./updateArticleController";
import { moveCsvToDirControoller } from "./moveCsvToDirControoller";


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