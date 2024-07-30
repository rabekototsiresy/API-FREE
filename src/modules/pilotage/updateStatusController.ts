import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { get } from "common/services/AxiosService";
import { env } from "../../ppenv.";
import { PPResponse } from "common/interfaces/PPResponse";
import { IPilotage, IRetourMSP } from "common/interfaces/IPilotage";
import { FileModel } from "common/models";

export const updateStatusController = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { idProd } = req.params;
    const aaa = (await get(`${env.retourMSP}`)) as PPResponse;

    console.log(aaa, "aaaaa");
    // let { data, result, message } = idProd as any
    // const mspList = data as IRetourMSP[];
    // if (result == "OK") {
    //   if (mspList && mspList.length !== 0) {
    //     for (const file of mspList) {
    //       const { IdProd } = file;
    //       await FileModel.update(
    //         { status: Number(file.Statut) },
    //         {
    //           where: { IdProd },
    //         }
    //       );
    //     }
    //     return ApiResponse(
    //       res,
    //       SUCCESS_CODE_200,
    //       true,
    //       "Status updated successfully"
    //     );
    //   } else {
    //     return ApiResponse(res, SERVER_ERROR_CODE_500, false, message);
    //   }
    // }
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
