import nodemailer from 'nodemailer';
import { markdown } from 'nodemailer-markdown';

import logger from './logger';
import mail from '../config/mail';
import MailOptions from '../domain/misc/MailOp';

const { smtp, from } = mail;

const transporter: any = nodemailer.createTransport(smtp as any);
transporter.use('compile', markdown());

/**
 * enviar e-mail usando o transportador nodemailer.
 *
 * @param {MailOptions} mailOptions
 */
export async function send(mailOptions: MailOptions): Promise<any> {
  try {
    if (!mailOptions.from) {
      mailOptions = { ...mailOptions, from };
    }

    logger.log('debug', 'Mail: Enviando e-mail com opções -', mailOptions);

    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (err) {
    logger.log('error', 'Mail: Falha ao enviar e-mail - %s', err.message);
  }
}

export default transporter;