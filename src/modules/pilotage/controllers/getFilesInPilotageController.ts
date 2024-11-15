import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  NOT_FOUND_CODE_404,
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { FileModel } from "common/models/FileModel";

export const getFilesInPilotageController = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { id } = req.params;
    const pageAsNumber = Number.parseInt((req.query as any).page);
    const sizeAsNumber = Number.parseInt((req.query as any).size);
    let page = 0;

    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
    let size = 5;
    if (!Number.isNaN(sizeAsNumber)) {
      size = sizeAsNumber;
    }
    if (!id) return ApiResponse(res, NOT_FOUND_CODE_404, false, "Id missing");
    const filesList = await FileModel.findAndCountAll({
      where: { pilotageId: id },
      order: [["createdAt", "DESC"]],

      // limit: size,
      // offset: page * size
    });
    return ApiResponse(res, SUCCESS_CODE_200, true, "List of file  pilotage", {
      records: filesList.rows,
      count: filesList.count,
    });
  } catch (error) {
    return ApiResponse(
      res,
      SERVER_ERROR_CODE_500,
      false,
      "Oops something went wrong"
    );
  }
};
