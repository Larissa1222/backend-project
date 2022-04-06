import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";
import handlebars from "handlebars";
import fs from 'fs';

import { IMailProvider } from "./IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  
  constructor() {
    //por nao conseguir usar async/await dentro do construtor, vai ser usado o
    //.then() que traz as informacoes da conta e repassar
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure:  account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        },
      });
      this.client = transporter;
    }).catch(err => console.error(err));
  }
  async sendMail(
      to: string,
      subject: string,
      variables: any,
      path: string
    ): Promise<void> {
    //converte o arquivo pra utf-8, compila e passa as variables pro arquivo
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHtml = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreply@rentx.com>",
      subject,
      html: templateHtml
    });
    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }

}
export { EtherealMailProvider }