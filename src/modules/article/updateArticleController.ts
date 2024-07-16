import { NextFunction, Request,Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import { CREATED_CODE_201, NOT_FOUND_CODE_404, SERVER_ERROR_CODE_500 } from "common/constants/HTTP_CODE";
import {ArticleConfigModel} from "../../common/models/ArticleConfigModel";

export const updateArticleController  = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleBody = req.body;
    const { id } = req.params;
    const article = await ArticleConfigModel.findByPk(id);
    console.log(article)

    if(!article) return ApiResponse(res,NOT_FOUND_CODE_404,false, "article  not found");
    const user:any = await ArticleConfigModel.update(articleBody,{where: {id}})
    return ApiResponse(res,CREATED_CODE_201,true, "article updated successful")
  } catch (error) {
    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "article updated failed")
    
  }
};
  