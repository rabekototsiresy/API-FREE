import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { get } from "common/services/AxiosService";
import { env } from "../../ppenv";
import { HistoriquePGModel } from "common/models";

export const getHistoriquePGController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const historiques = await HistoriquePGModel.findAll();
    return ApiResponse(
      res,
      SUCCESS_CODE_200,
      true,
      "List of all historiques pg",
      historiques
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
