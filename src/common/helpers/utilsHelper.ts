import path from "path";
import fs from "fs";
import schedule from "node-schedule";
import { FileModel } from "common/models/FileModel";
import { Op } from "sequelize";
import { PilotageModel } from "common/models/PilotageModel";
import { env } from "ppenv";
import { get } from "common/services/AxiosService";
export const getFilesInFolder = (folderPath: string) => {
  try {
    const files = fs.readdirSync(folderPath);
    const fileObjects = files.map((file) => {
      const filePath = path.join(folderPath, file);
      return {
        filename: path.parse(file).name,
        extension: path.extname(file).slice(1),
        path: filePath,
      };
    });
    return fileObjects;
  } catch (error) {
    return [];
  }
};

export const saveFile = (filePath: string, fileBuffer: any) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, fileBuffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(filePath);
      }
    });
  });
};

const getNbJourRetention = () => {
  return get(`${env.getNbJourRetention}`);
};
const deleteOldData = async () => {
  const dateThreshold = new Date();
  const { result, data: days } = await getNbJourRetention();

  dateThreshold.setDate(dateThreshold.getDate() - days); // Calculer la date limite

  try {
    // Supprimer les entrées plus anciennes que la date limite
    await FileModel.destroy({
      where: {
        createdAt: {
          [Op.lt]: dateThreshold, // Moins que la date limite
        },
      },
    });

    await PilotageModel.destroy({
      where: {
        createdAt: {
          [Op.lt]: dateThreshold, // Moins que la date limite
        },
      },
    });

    console.log(`Données plus anciennes que ${days} jours ont été supprimées.`);
  } catch (error) {
    console.error(
      "Erreur lors de la suppression des anciennes données :",
      error
    );
  }
};

// Fonction pour planifier la suppression des anciennes données tous les jours à minuit
export const scheduleOldDataDeletion = () => {
  const rule = new schedule.RecurrenceRule();

  // Planifier la tâche pour s'exécuter tous les jours à minuit
  rule.hour = 0; // Exécuter à minuit
  rule.minute = 0;

  // Planifier la tâche
  schedule.scheduleJob(rule, () => deleteOldData());
  console.log(
    `La tâche de suppression des données plus anciennes  est programmée pour s'exécuter à minuit.`
  );
};
