import multer from "multer";
import crypto from "crypto";
import { resolve } from "path";

//rota pra armazenar a foto do avatar
//criptografia pra trocar nome do arquivo de foto (p n ter iguais)
export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
