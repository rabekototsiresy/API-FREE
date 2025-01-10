import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  CONFLICT_CODE_409,
  CREATED_CODE_201,
  SERVER_ERROR_CODE_500,
} from "common/constants/HTTP_CODE";
import { env } from "ppenv";
import { get, post } from "common/services/AxiosService";
import { PPResponse } from "common/interfaces/PPResponse";

export const pliGeneriqueController = async (
  req: Request | any,
  res: Response,
  _next: NextFunction
) => {
  try {
    const body = req.body.value;
    console.log(body, "body");
    const { result, message } = (await post(
      `${env.generatePg}`,
      body
    )) as PPResponse;
    req.apiResponse = { ppResponse: result };

    if (result === "OK") {
      return ApiResponse(
        res,
        CREATED_CODE_201,
        true,
        "Pli généré avec succès",
        "data"
      );
    }
    return ApiResponse(res, SERVER_ERROR_CODE_500, false, message);
  } catch (error) {
    return ApiResponse(res, SERVER_ERROR_CODE_500, false, "Generation failed");
  }
};
