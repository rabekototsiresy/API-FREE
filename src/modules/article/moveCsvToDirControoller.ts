import { NextFunction, Request,Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import { CREATED_CODE_201, NOT_FOUND_CODE_404, SERVER_ERROR_CODE_500 } from "common/constants/HTTP_CODE";
import { ArticleConfigModel } from "../../../server";
import { json2csv } from 'json-2-csv';
import * as fs from 'fs';
import * as path from 'path';


export const moveCsvToDirControoller  = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   const articlesList = await ArticleConfigModel.findAll({raw: true,attributes: {
    exclude: ['id', 'createdAt', 'updatedAt']
   }})
    const csv = await json2csv(articlesList,{delimiter: {field: ";"}});
  const csvFormatedF = csv.replace(/\n/g, '\r\n');
  const directoryPath = 'C:\\OL_CONNECT\\Production';
  const filePath = path.join(directoryPath, 'output_articles.csv');
   // Write the CSV content to the file with UTF-8 encoding and BOM
   const bom = '\uFEFF'; // Byte Order Mark (BOM) for UTF-8
  fs.writeFileSync(filePath, bom+csvFormatedF, 'utf8');

    return ApiResponse(res, CREATED_CODE_201, true, "csv moved successfully",articlesList);
  } catch (error) {
    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "csv failed")
    
  }
};
  