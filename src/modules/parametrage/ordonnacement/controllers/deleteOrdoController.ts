import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import { NOT_FOUND_CODE_404, SERVER_ERROR_CODE_500, SUCCESS_CODE_200 } from "common/constants/HTTP_CODE";
import { OrdonnancementModel } from "common/models/OrdonnancementModel";



export const deleteOrdoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id  } = req.params;
    const ordonnacement = await OrdonnancementModel.findByPk(id);
    if (!ordonnacement) return ApiResponse(res,NOT_FOUND_CODE_404,false, "ordonnacement not found");
    await OrdonnancementModel.destroy({where: {id}});
    return ApiResponse(res,SUCCESS_CODE_200,true,"ordonnacement removed successfully id: "+id);
  } catch (error) {
    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "Oops something went wrong")

  }

};
