import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { OrdonnancementModel } from "common/models/OrdonnancementModel";
import { get } from "common/services/AxiosService";
import { env } from "ppenv";

export const getDayToClearDbPPController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { result, data } = await get(`${env.getNbJourRetention}`);
    req.apiResponse = { ppResponse: result };

    if (result == "OK") {
      return ApiResponse(
        res,
        SUCCESS_CODE_200,
        true,
        "Nombre de jour de retention dans la base de données",
        data
      );
    } else {
      return ApiResponse(
        res,
        SERVER_ERROR_CODE_500,
        false,
        "Il y a un problème sur le serveur PlanetPress."
      );
    }
  } catch (error) {
    return ApiResponse(
      res,
      SERVER_ERROR_CODE_500,
      false,
      "Oops something went wrong"
    );
  }
};
