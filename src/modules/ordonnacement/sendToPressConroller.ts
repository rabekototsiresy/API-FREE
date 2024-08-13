import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  CREATED_CODE_201,
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { post } from "common/services/AxiosService";
import { env } from "ppenv";
import { OrdonnancementModel } from "common/models/OrdonnancementModel";

export const sendToPressConroller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ordonnacements = await OrdonnancementModel.findAll();
    const { result } = await post(`${env.sendOrdonnancement}`, ordonnacements);
    if (result == "OK") {
      return ApiResponse(
        res,
        SUCCESS_CODE_200,
        false,
        "Ordonnancement sent successfully"
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
      "Send ordonnacement failed"
    );
  }
};
