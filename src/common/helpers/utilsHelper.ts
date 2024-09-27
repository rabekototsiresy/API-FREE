import path from "path";
import fs from "fs";
export const mmToPx = (px: any) => {
  return px * 0.2645833333;
};
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
