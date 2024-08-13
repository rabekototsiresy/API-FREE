import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { post } from "../../common/services/AxiosService";
import { env } from "../../ppenv";

import { FileModel } from "common/models/FileModel";
enum eAction {
  print,
  cancel,
}
export const handleMspController = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { type, idProdList: pilotages } = req.body;
    const path = type === eAction.cancel ? env.cancelMsp : env.printMsp;
    const { result, data: reprindIProdList } = await post(`${path}`, pilotages);
    if (result == "OK") {
      let currentPilotage =
        type === eAction.cancel ? pilotages : reprindIProdList;
      let status = type === eAction.cancel ? 3 : 2;
      for (let index = 0; index < currentPilotage.length; index++) {
        await FileModel.update(
          { status },
          {
            where: { IdProd: currentPilotage[index] },
          }
        );
      }
      const message =
        type === eAction.cancel ? "Canceled successfully" : "Print pending";
      return ApiResponse(res, SUCCESS_CODE_200, true, message);
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
      "Oops something went wrong"
    );
  }
};

// 66 Longeur

// 21m zanot

// 45m pasy

// taraka tamin'ny tao
