import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { get } from "common/services/AxiosService";
import { env } from "ppenv";
import { PPResponse } from "common/interfaces/PPResponse";
import { FileModel } from "common/models/FileModel";
import { Op } from "sequelize";

export const razController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await get(`${env.raz}`);
    const { result } = response as PPResponse;
    if (result == "OK") {
      await FileModel.update(
        { status: 3 },
        {
          where: {
            [Op.and]: [
              { TypeProd: { [Op.in]: ["PG", "MP"] } },
              { status: { [Op.eq]: 2 } },
            ],
          },
        }
      );
      return ApiResponse(
        res,
        SUCCESS_CODE_200,
        true,
        "Reset successfully completed."
      );
    } else
      return ApiResponse(
        res,
        SERVER_ERROR_CODE_500,
        false,
        "Il y a un problème sur le serveur PlanetPress."
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
