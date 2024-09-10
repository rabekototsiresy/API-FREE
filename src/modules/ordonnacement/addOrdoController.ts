import { NextFunction, Request,Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {  CREATED_CODE_201, SERVER_ERROR_CODE_500 } from "common/constants/HTTP_CODE";
import { OrdonnancementModel } from "common/models/OrdonnancementModel";
import { env } from "ppenv";
import { post } from "common/services/AxiosService";

export const addOrdoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ordonnacementBody = req.body;
    const ordonnacement = await OrdonnancementModel.create(ordonnacementBody);
    const ordonnacements = await OrdonnancementModel.findAll();
    const { result } = await post(`${env.sendOrdonnancement}`, ordonnacements);
    if (result == "OK")  return ApiResponse(res,CREATED_CODE_201,true, "ordonnacement added successfuly", ordonnacement)

     else {
      return ApiResponse(
        res,
        SERVER_ERROR_CODE_500,
        false,
        "Il y a un problème sur le serveur PlanetPress."
      );
    }

  } catch (error) {
    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "Add ordonnacement failed")
  }
};
