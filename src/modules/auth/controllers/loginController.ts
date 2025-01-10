import { NextFunction, Request, Response } from "express";
import { UserModel } from "common/models/UserModel";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  FORBIDDEN_CODE_403,
  NOT_FOUND_CODE_404,
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
  UNAUTHORIZED_CODE_401,
} from "common/constants/HTTP_CODE";
import { comaprePassword } from "common/services/passwordService";
import { signToken } from "common/helpers/jsonWebToken";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body.value;

    const user: any = await UserModel.findOne({ where: { email } });
    if (!user)
      return ApiResponse(res, NOT_FOUND_CODE_404, false, "User not found");

    const isMatch = comaprePassword(password, user.password);
    if (!isMatch)
      return ApiResponse(res, FORBIDDEN_CODE_403, false, "Wrong password");
    const data = {
      user,
      api_token: signToken(user),
    };
    return ApiResponse(
      res,
      SUCCESS_CODE_200,
      true,
      "connected successfully",
      data
    );
  } catch (error) {
    return ApiResponse(
      res,
      SERVER_ERROR_CODE_500,
      false,
      "Oops something went wrong"
    );
  }
};
