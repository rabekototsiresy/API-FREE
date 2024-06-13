import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import { SERVER_ERROR_CODE_500, SUCCESS_CODE_200 } from "common/constants/HTTP_CODE";
import { UserModel } from "../../../server";



export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * send request to planetpress
     */

    const pageAsNumber  = Number.parseInt((req.query as any).page);
    const sizeAsNumber  = Number.parseInt((req.query as any).size);

    let page = 0

    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
    let size = 5;
    if(!Number.isNaN(sizeAsNumber)) {
      
      size = sizeAsNumber;
    
    }
    const users = await UserModel.findAndCountAll({
      attributes: ['id','firstName','lastName','role','createdAt','email','password'],
      limit: size,
      offset: page * size
    })
    return ApiResponse(res,SUCCESS_CODE_200,true,"List of all users",{records: users.rows,count: users.count});
    
  } catch (error) {
    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "Server error")

  }

};
