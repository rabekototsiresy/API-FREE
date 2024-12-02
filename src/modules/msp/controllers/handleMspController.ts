import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { post } from "../../../common/services/AxiosService";
import { env } from "../../../ppenv";

import { FileModel } from "common/models/FileModel";
import { EStatus } from "common/enums/EStatus";
import { Socket } from "socket.io";
enum eAction {
  print,
  cancel,
}

export const handleMspController = async (socket: Socket, body: any) => {
  try {
    const { type, idProdList: pilotages } = body;
    socket.emit(
      "on_rmsp_pending",
      `${
        type === eAction.cancel ? "Annulation" : "Re-impression"
      }   en cours ...`
    );
    const path = type === eAction.cancel ? env.cancelMsp : env.printMsp;
    let currentPilotage = type === eAction.cancel ? pilotages : pilotages;
    let status = type === eAction.cancel ? EStatus.CANCELED : EStatus.TRAITED;
    for (let index = 0; index < currentPilotage.length; index++) {
      await FileModel.update(
        { status },
        {
          where: { IdProd: currentPilotage[index] },
        }
      );
    }
    const { result } = await post(`${path}`, pilotages);
    if (result == "OK") {
      const message =
        type === eAction.cancel ? "Canceled successfully" : "Print pending";
      socket.emit("on_rmsp_success", message);
    } else {
      socket.emit(
        "on_rmsp_error",
        "Il y a un problème sur le serveur PlanetPress."
      );
    }
  } catch (error) {
    socket.emit("on_rmsp_error", "Oops something went wrong");
  }
};
