import { NextFunction, Request,Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import { CREATED_CODE_201, NOT_FOUND_CODE_404, SERVER_ERROR_CODE_500 } from "common/constants/HTTP_CODE";
import { OrdonnancementModel } from "common/models/OrdonnancementModel";

export const updateOrdoController  = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ordonnacementBody = req.body;
    const { id } = req.params;
    const userExist = await OrdonnancementModel.findByPk(id);
    if(!userExist) return ApiResponse(res,NOT_FOUND_CODE_404,false, "ordonnacement  not found");
    const user:any = await OrdonnancementModel.update(ordonnacementBody,{where: {id}})
    return ApiResponse(res,CREATED_CODE_201,true, "ordonnacement updated successful", user)
  } catch (error) {
    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "Update failed")
    
  }
};
  