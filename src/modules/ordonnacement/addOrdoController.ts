import { NextFunction, Request,Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {  CREATED_CODE_201, SERVER_ERROR_CODE_500 } from "common/constants/HTTP_CODE";
import { OrdonnancementModel } from "../../../server";

export const addOrdoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ordonnacementBody = req.body;
    const ordonnacement = await OrdonnancementModel.create(ordonnacementBody);
    return ApiResponse(res,CREATED_CODE_201,true, "ordonnacement added successfuly", ordonnacement)

  } catch (error) {
    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "Add ordonnacement failed")
    
  }
};
