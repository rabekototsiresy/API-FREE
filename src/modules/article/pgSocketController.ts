import { env } from "ppenv";
import { get, post } from "common/services/AxiosService";
import { PPResponse } from "common/interfaces/PPResponse";
import { Socket } from "socket.io";
import { HistoriquePGModel } from "common/models";

export const pgSocketController = async (socket: Socket, body: any) => {
  try {
    socket.emit("on_pg_pending", "Génération du pli générique en cours ... ");
    const historique: any = await HistoriquePGModel.create({
      dateSoumission: new Date(),
      nombrePg: body.quantite,
      article: body.Libelle,
    });
    const { result, message } = (await post(
      `${env.generatePg}`,
      body
    )) as PPResponse;
    if (result === "OK") {
      console.log("PG FINISHED");
      historique.dateSortie = new Date();
      await historique.save();
      socket.emit("on_pg_success", "Pli généré avec succès ");
    }
  } catch (error) {
    socket.emit("on_pg_error", "Generation failed ");
  }
};
