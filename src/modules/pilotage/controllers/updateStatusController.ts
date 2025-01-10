import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { get } from "common/services/AxiosService";
import { env } from "../../../ppenv";
import { PPResponse } from "common/interfaces/PPResponse";
import { IPilotage, IRetourMSP } from "common/interfaces/IPilotage";
import { FileModel } from "common/models";
import { EStatus } from "common/enums/EStatus";

export const updateStatusController = async (
  req: Request | any,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { type } = req.query;
    let route;
    if (type === "msp") route = env.retourMSP;
    else if (type === "manuel") route = env.refresh_status_processed;

    const response = await get(`${route}`);
    const { data, result, message } = response as PPResponse;
    const mspList = data as IRetourMSP[];
    req.apiResponse = { ppResponse: mspList };

    if (result == "OK") {
      if (mspList && mspList.length !== 0) {
        for (const file of mspList) {
          const { IdProd } = file;
          let where;
          if (type === "msp") {
            where = { IdProd };
          } else if (type === "manuel") {
            where = { IdProd, status: EStatus.PENDING };
          }
          await FileModel.update(
            { status: Number(file.Statut) },
            {
              where: { ...where },
            }
          );
        }
        return ApiResponse(
          res,
          SUCCESS_CODE_200,
          true,
          "Données mises à jour avec succès!"
        );
      } else {
        return ApiResponse(res, SUCCESS_CODE_200, true, "Tout est à jour");
      }
    } else {
      return ApiResponse(res, SERVER_ERROR_CODE_500, false, message);
    }
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
