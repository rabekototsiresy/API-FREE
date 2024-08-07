import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { get } from "../../common/services/AxiosService";
import { env } from "../../ppenv.";
import { PilotageModel } from "common/models/PilotageModel";
import { FileModel } from "common/models/FileModel";
import { Op } from "sequelize";
import { PPResponse } from "common/interfaces/PPResponse";
import { IPilotage } from "common/interfaces/IPilotage";

export const getPilotageController = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const {
      data: pilotagegFileListFromPP,
      result,
      message,
    } = (await get(`${env.getPilotingFile}`)) as PPResponse<IPilotage[]>;

    if (result == "OK") {
      if (pilotagegFileListFromPP && pilotagegFileListFromPP.length !== 0) {
        for (let i = 0; i < pilotagegFileListFromPP.length; i++) {
          const pilotagePayload = {
            filename: pilotagegFileListFromPP[i].filename,
            status: pilotagegFileListFromPP[i].isOK ? 1 : 0,
          };
          const pilotage: any = await PilotageModel.create(pilotagePayload);
          console.log(pilotage, "---", pilotage.id);
          const fileList = pilotagegFileListFromPP[i].listeFichier.map(
            (file: any) => ({ ...file, pilotageId: pilotage.id, status: 2 }) //0: ko, 1: ok, 2: en cours
          );
          await FileModel.bulkCreate(fileList);
        }
      } else {
        return ApiResponse(res, SERVER_ERROR_CODE_500, false, message);
      }
    }
    // }
    /**
     * send request to planetpress
     */

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

    // let whereClause = {} as any;

    // if (filename) {
    //   whereClause.filename = { [Op.like]: `%${filename}%` }; // For partial matches
    // }

    // if (createdAt) {
    //   whereClause.createdAt = createdAt;
    // }

    // if (status !== undefined) {
    //   whereClause.status = status;
    // }

    const pilotageList = await PilotageModel.findAndCountAll({
      attributes: ["id", "filename", "status", "createdAt"],
      // where: whereClause,
      // limit: size,
      // offset: page * size
    });
    return ApiResponse(res, SUCCESS_CODE_200, true, "List of all pilotage", {
      records: pilotageList.rows,
      count: pilotageList.count,
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
