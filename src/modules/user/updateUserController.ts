import { NextFunction, Request,Response } from "express";
import { ICredential } from "common/interfaces/ICredential";
import { IUser } from "common/interfaces/IUser";
import { cryptoPassword } from "common/services/passwordService";
import { ApiResponse } from "common/helpers/ApiResponse";
import { CREATED_CODE_201, NOT_FOUND_CODE_404, SERVER_ERROR_CODE_500 } from "common/constants/HTTP_CODE";
import { UserModel } from "common/models/UserModel";

export const updateUserController  = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userBody = req.body.value;
    const { id } = req.params;
    const userExist = await UserModel.findByPk(id);
    if(!userExist) return ApiResponse(res,NOT_FOUND_CODE_404,false, "user  not found");
    delete userBody.password
    const user:any = await UserModel.update(userBody,{where: {id}})
    return ApiResponse(res,CREATED_CODE_201,true, "User updated successful", user)
  } catch (error) {
    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "Registration failed")
    
  }
};
  