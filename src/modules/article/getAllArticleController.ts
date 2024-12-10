import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  BAD_REQUEST_400,
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { get } from "common/services/AxiosService";
import { env } from "../../ppenv";

export const getAllArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { result, data, message } = await get(`${env.getSettingsTable}`);
    let msg = "";
    let success = true;
    if (result == "OK") {
      msg = "List of all articles";
    } else {
      msg = message;
      success = false;
    }
    return ApiResponse(res, SUCCESS_CODE_200, success, msg, data);
  } catch (error) {
    return ApiResponse(
      res,
      SERVER_ERROR_CODE_500,
      false,
      "Oops something went wrong"
    );
  }
};
