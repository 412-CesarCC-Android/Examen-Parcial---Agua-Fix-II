import { Injectable } from '@nestjs/common';
import nodemailer, { SentMessageInfo, Transporter } from 'nodemailer';
import { envs } from '../config/envs';

@Injectable()
export class EmailService {
  private readonly transporter: Transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_USER,
      pass: envs.MAILER_PASSWORD,
    },
  });

  sendEmail(
    to: string,
    subject: string,
    template: string,
  ): Promise<SentMessageInfo> {
    return this.transporter.sendMail({
      from: envs.MAILER_USER,
      to,
      subject,
      html: template,
    });
  }
}
