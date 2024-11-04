import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  NO_CONTENT_204,
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { get } from "../../../common/services/AxiosService";
import { env } from "../../../ppenv";
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
            nombrePli: pilotagegFileListFromPP[i].isOK
              ? pilotagegFileListFromPP[i].listeFichier.length
              : 0,
          };
          const pilotage: any = await PilotageModel.create(pilotagePayload);
          const fileList = pilotagegFileListFromPP[i].listeFichier.map(
            (file: any) => ({ ...file, pilotageId: pilotage.id, status: 2 }) //0: ko, 1: ok, 2: en cours
          );
          await FileModel.bulkCreate(fileList);
        }

        const pilotageList = await PilotageModel.findAndCountAll({
          attributes: ["id", "filename", "status", "nombrePli", "createdAt"],
          order: [["createdAt", "DESC"]],
          // where: whereClause,
          // limit: size,
          // offset: page * size
        });
        return ApiResponse(
          res,
          SUCCESS_CODE_200,
          true,
          "List of all pilotage",
          {
            records: pilotageList.rows,
            count: pilotageList.count,
          }
        );
      } else {
        const pilotageList = await PilotageModel.findAndCountAll({
          attributes: ["id", "filename", "status", "nombrePli", "createdAt"],
          order: [["createdAt", "DESC"]],
          // where: whereClause,
          // limit: size,
          // offset: page * size
        });
        return ApiResponse(
          res,
          SUCCESS_CODE_200,
          false,
          "Aucun nouveau fichier de pilotage détecté.",
          {
            records: pilotageList.rows,
            count: pilotageList.count,
          }
        );
      }
    } else {
      return ApiResponse(
        res,
        SERVER_ERROR_CODE_500,
        false,
        "Il y a un problème sur le serveur PlanetPress."
      );
    }
  } catch (error) {
    console.log(error);
    return ApiResponse(
      res,
      SERVER_ERROR_CODE_500,
      false,
      "Oops something went wrong"
    );
  }
};
