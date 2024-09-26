import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { ArticleConfigModel } from "../../common/models/ArticleConfigModel";
import { get } from "common/services/AxiosService";
import { env } from "process";

export const getAllArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { result, data, message } = await get(`${env.getSettingsTable}`);
    if (result == "OK") {
      return ApiResponse(
        res,
        SUCCESS_CODE_200,
        true,
        "Liste table de paramètrage",
        data
      );
    } else {
      return ApiResponse(res, SERVER_ERROR_CODE_500, false, message);
    }
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
