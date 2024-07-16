import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import { NOT_FOUND_CODE_404, SERVER_ERROR_CODE_500, SUCCESS_CODE_200 } from "common/constants/HTTP_CODE";
import {get} from "../../common/services/AxiosService";
import {env} from "../../ppenv.";
import { PilotageModel } from "common/models/PilotageModel";
import { FileModel } from "common/models/FileModel";



export const getPilotageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {data: pilotagegFileListFromPP} = await get(`${env.getPilotingFile}`);
    if(pilotagegFileListFromPP && pilotagegFileListFromPP.length !== 0) {
      for (let i = 0; i < pilotagegFileListFromPP.length ; i++) {
        const pilotagePayload = {
          filename: pilotagegFileListFromPP[i].filename,
          status: pilotagegFileListFromPP[i].isOK ? 1 : 0
        }
        const pilotage:any = await PilotageModel.create(pilotagePayload);
        console.log(pilotage,'---',pilotage.id)
        const fileList = pilotagegFileListFromPP[i].listeFichier.map((file: any) =>({...file,pilotageId: pilotage.id}));
        await FileModel.bulkCreate(fileList);


      }
    }
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
    const pilotageList = await PilotageModel.findAndCountAll({
      attributes: ['id','filename','status'],
      limit: size,
      offset: page * size
    })
    return ApiResponse(res,SUCCESS_CODE_200,true,"List of all pilotage",{records: pilotageList.rows,count: pilotageList.count});

  } catch (error) {
    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "Oops something went wrong")

  }

};
