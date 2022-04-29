import fs from "fs";
import { resolve } from "path";
import { IStorageProvider } from "./IStorageProvider";
import upload from "../../../../config/upload";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    fs.promises.rename(
      resolve(upload)
    )
  }
  async delete(file: string, folder: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}

export { LocalStorageProvider }