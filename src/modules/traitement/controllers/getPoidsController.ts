import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import {
  NOT_FOUND_CODE_404,
  SERVER_ERROR_CODE_500,
  SUCCESS_CODE_200,
} from "common/constants/HTTP_CODE";
import { FileModel } from "common/models/FileModel";
import { get } from "common/services/AxiosService";
import { env } from "ppenv";
import { Op, Sequelize } from "sequelize";

export const getPoidsController = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { typeProd } = req.query;

    const { data: weightsList, result, message } = await get(`${env.getPoids}`);

    if (result == "OK") {
      if (weightsList.length > 0) {
        for (const file of weightsList) {
          await FileModel.update(
            { Departement: file.dpt, Poids: file.poids },
            {
              where: { IdProd: file.idProd },
            }
          );
        }
      }
      const filesList = await FileModel.findAndCountAll({
        where: {
          [Op.and]: [{ status: 2 }, { TypeProd: typeProd }],
        },
        attributes: [
          "Departement",
          [Sequelize.fn("SUM", Sequelize.col("Poids")), "totalPoids"], // Somme des poids
          [
            Sequelize.fn("COUNT", Sequelize.col("Departement")),
            "NombreDocument",
          ], // Nombre d'entrées par département
        ],
        group: ["Departement"],
      });

      return ApiResponse(
        res,
        SUCCESS_CODE_200,
        true,
        "List of all weights",
        filesList
      );
    } else {
      return ApiResponse(
        res,
        SERVER_ERROR_CODE_500,
        false,
        "Il y a un problème sur le serveur PlanetPress."
      );
    }
  } catch (error) {
    console.log(error);
    return ApiResponse(
      res,
      SERVER_ERROR_CODE_500,
      false,
      "Oops something went wrong"
    );
  }
};
