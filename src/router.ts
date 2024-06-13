import { Router } from "express";
import { AuthRoute } from './modules/auth/authRouting';
import { UserRoute } from "modules/user";

export const AppRoute: Router = Router();

AppRoute.use('/auth',[ AuthRoute ]);
AppRoute.use('/user',[ UserRoute ]);
