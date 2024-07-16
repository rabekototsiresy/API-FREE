import { NextFunction, Request,Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import { CONFLICT_CODE_409, CREATED_CODE_201, SERVER_ERROR_CODE_500 } from "common/constants/HTTP_CODE";
import { UserModel } from "common/models/UserModel";

export const addPilotageController = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const userBody = req.body.value;
    const userExist = await UserModel.findOne({ where: { email: userBody.email } });
    if (userExist) return ApiResponse(res,CONFLICT_CODE_409,false, "user   already exist")
    const user = await UserModel.create(userBody);
    return ApiResponse(res,CREATED_CODE_201,true, "Registration successful", user)

  } catch (error) {
    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "Registration failed")
    
  }
};
