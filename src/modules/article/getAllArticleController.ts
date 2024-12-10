import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
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
    let status = true;
    if (result == "OK") {
      msg = "Liste table de paramètrage";
    } else {
      msg = message;
      status = false;
    }
    return ApiResponse(res, SUCCESS_CODE_200, status, msg, data);
    // const articlesList = await ArticleConfigModel.findAll();
    // return ApiResponse(res,SUCCESS_CODE_200,true,"List of all articles",articlesList);
  } catch (error) {
    return ApiResponse(
      res,
      SERVER_ERROR_CODE_500,
      false,
      "Oops something went wrong"
    );
  }
};
