import { NextFunction, Request,Response } from "express";
import { cryptoPassword } from "common/services/passwordService";
import { ApiResponse } from "common/helpers/ApiResponse";
import { CONFLICT_CODE_409, CREATED_CODE_201, SERVER_ERROR_CODE_500 } from "common/constants/HTTP_CODE";
import { UserModel } from "common/models/UserModel";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password ,role} = req.body.value;
    console.log(await cryptoPassword(password))
    const userExist = await UserModel.findOne({ where: { email } });
    if (userExist) return ApiResponse(res,CONFLICT_CODE_409,false, "User already exist")
    const user = await UserModel.create({ firstName,lastName, email,role,password: await cryptoPassword(password) }) as any;
    return ApiResponse(res,CREATED_CODE_201,true, "Registration successful",user)

  } catch (error) {

    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "Registration failed")
    
  }
};
