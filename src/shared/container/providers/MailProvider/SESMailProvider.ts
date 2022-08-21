import nodemailer, { Transporter } from "nodemailer";
import aws from "aws-sdk";
import { injectable } from "tsyringe";
import handlebars from "handlebars";
import fs from 'fs';

import { IMailProvider } from "./IMailProvider";

@injectable()
//Sesmailprovider requer um dominio comprado (oq possui custos), codigo apenas demonstrativo
//por isso nao tera uso.
export class SESMailProvider implements IMailProvider {
  private client: Transporter;
  
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: "versao",
        region: "regiao"
      }),
    });
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

    await this.client.sendMail({
      to,
      from: "Rentx <noreply@rentx.com>",
      subject,
      html: templateHtml
    });
  }

}