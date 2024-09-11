import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { post } from "common/services/AxiosService";
import { env } from "ppenv";

export const runProcessController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const { result, data } = await post(`${env.manualProcess}`, body);
    if (result == "OK") {
      return ApiResponse(
        res,
        SUCCESS_CODE_200,
        true,
        "Traitement en cours",
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
