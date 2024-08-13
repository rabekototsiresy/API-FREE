import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  CREATED_CODE_201,
  NOT_FOUND_CODE_404,
  SERVER_ERROR_CODE_500,
} from "common/constants/HTTP_CODE";
import { OrdonnancementModel } from "common/models/OrdonnancementModel";
import { post } from "common/services/AxiosService";
import { env } from "ppenv";

export const updateOrdoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ordonnacementBody = req.body;
    const { id } = req.params;
    const ordonnacement = await OrdonnancementModel.findByPk(id);
    if (!ordonnacement)
      return ApiResponse(
        res,
        NOT_FOUND_CODE_404,
        false,
        "ordonnacement  not found"
      );
    const user: any = await OrdonnancementModel.update(ordonnacementBody, {
      where: { id },
    });
    const ordonnacements = await OrdonnancementModel.findAll();
    const { result } = await post(`${env.sendOrdonnancement}`, ordonnacements);
    if (result == "OK") {
      return ApiResponse(
        res,
        CREATED_CODE_201,
        true,
        "ordonnacement updated successful",
        user
      );
    } else {
      return ApiResponse(
        res,
        SERVER_ERROR_CODE_500,
        false,
        "Il y a un problème sur le serveur PlanetPress."
      );
    }
  } catch (error) {
    return ApiResponse(res, SERVER_ERROR_CODE_500, false, "Update failed");
  }
};
