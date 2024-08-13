import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";

import { FileModel } from "common/models";

export const getRejetMspController = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const rejetMspList = await FileModel.findAndCountAll({
      where: { status: 0 },
    });
    return ApiResponse(res, SUCCESS_CODE_200, true, "List of all pilotage", {
      records: rejetMspList.rows,
      count: rejetMspList.count,
    });
  } catch (error) {
    console.log(error, "error");
    return ApiResponse(
      res,
      SERVER_ERROR_CODE_500,
      false,
      "Oops something went wrong"
    );
  }
};
