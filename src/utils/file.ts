import fs from "fs";

//para atualizar a foto do avatar e excluir a antiga
export const deleteFile = async (filename: string) => {
  try {
    //verifica se o arquivo existe
    await fs.promises.stat(filename);
  } catch {
    return;
  }
  //remove o arquivo existente
  await fs.promises.unlink(filename);
};
