import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { OrdonnancementModel } from "common/models/OrdonnancementModel";

export const getDayToClearDbPPController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return ApiResponse(
      res,
      SUCCESS_CODE_200,
      true,
      "Nombre de jour de retention dans la base de données",
      20
    );
  } catch (error) {
    return ApiResponse(
      res,
      SERVER_ERROR_CODE_500,
      false,
      "Oops something went wrong"
    );
  }
};
