import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/EtherealMailProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { LocalStorageProvider } from "./StorageProvider/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/S3StorageProvider";
import { SESMailProvider } from "./MailProvider/SESMailProvider";

const mailProvider = {
  ethereal: EtherealMailProvider,
  ses: SESMailProvider,
};

container.registerSingleton<IDateProvider>
  ("DayjsDateProvider", 
  DayjsDateProvider
);

container.registerInstance<IMailProvider>
  ("MailProvider",
    mailProvider[process.env.MAIL_PROVIDER]
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>
  ("StorageProvider",
  diskStorage[process.env.disk]
);