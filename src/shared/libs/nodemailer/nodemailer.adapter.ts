import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';

import {
  IMailer,
  TSendMailParams,
} from '@/shared/interface/mail/mailer.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NodeMailerAdapter implements IMailer {
  transport: nodemailer.Transporter;

  private mail = this.configService.get('mail');

  constructor(private readonly configService: ConfigService) {}

  async sendMail(params: TSendMailParams) {
    const transport = this.getTransport();
    const options = {
      to: params.to,
      subject: params.subject,
      context: params.context,
      template: params.template,
      from: `BJJ Stars <${this.mail.globalMail.user}>`,
    };

    const result = await transport.sendMail(options);
    return result.accepted.length > 0;
  }

  private getTransport() {
    if (this.transport) return this.transport;

    const TEMPLATES_PATH = 'src/shared/libs/nodemailer/templates/';
    const transport = nodemailer.createTransport({
      host: this.mail.host,
      port: 587,
      secure: false,
      auth: {
        user: this.mail.globalMail.user,
        pass: this.mail.globalMail.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    transport.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.hbs',
          defaultLayout: false,
          layoutsDir: TEMPLATES_PATH,
          partialsDir: TEMPLATES_PATH,
        },
        viewPath: TEMPLATES_PATH,
        extName: '.hbs',
      }),
    );

    this.transport = transport;

    return transport;
  }
}

export const NodeMailerAdapterProvider = {
  provide: 'IMailer',
  useClass: NodeMailerAdapter,
};
