import multer from "multer";
import crypto from "crypto";
import { resolve } from "path";

/*
  Rota pra armazenar a foto do avatar
  criptografia pra trocar nome do arquivo de foto (p n ter iguais)
*/

const tmpFolder = resolve(__dirname, "..", "..", "tmp");
export default {
  tmpFolder,
  
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
