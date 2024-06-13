import { NextFunction, Request,Response } from "express";
import { comaprePassword, cryptoPassword } from "common/services/passwordService";
import { ApiResponse } from "common/helpers/ApiResponse";
import { SUCCESS_CODE_200, FORBIDDEN_CODE_403, NOT_FOUND_CODE_404, SERVER_ERROR_CODE_500 } from "common/constants/HTTP_CODE";
import { UserModel } from "common/models/UserModel";

export const updatePasswordController  = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {newPassword,oldPassword,userId} = req.body;
    const user:any = await UserModel.findByPk(userId);
    if(!user) return ApiResponse(res,NOT_FOUND_CODE_404,false, "user  not found");
    const isMatch = comaprePassword(oldPassword,user.password);
    if(!isMatch) return ApiResponse(res,FORBIDDEN_CODE_403,false,"Wrong password");
    await UserModel.update({password: await cryptoPassword(newPassword) },{where: {id: userId}})
    return ApiResponse(res,SUCCESS_CODE_200,true, "Password updated successful")

  } catch (error) {
    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "Update failed",error)
    
  }
};
