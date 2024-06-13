import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import { NOT_FOUND_CODE_404, SERVER_ERROR_CODE_500, SUCCESS_CODE_200 } from "common/constants/HTTP_CODE";
import { UserModel } from "../../../server";



export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * send request to planetpress
     */

    const { id  } = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) return ApiResponse(res,NOT_FOUND_CODE_404,false, "profile not found");
    await UserModel.destroy({where: {id}});
    return ApiResponse(res,SUCCESS_CODE_200,true,"uSER removed successfully id: "+id);
  } catch (error) {
    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "Server error")

  }

};
