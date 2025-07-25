// src/utils/sendMail.js
import nodemailer from 'nodemailer';
import { getEnvVar } from './getEnvVar.js';
import { SMTP } from '../constants/index.js';

const transporter = nodemailer.createTransport({
  host: getEnvVar(SMTP.SMTP_HOST),
  port: Number(getEnvVar(SMTP.SMTP_PORT)),
  auth: {
    user: getEnvVar(SMTP.SMTP_USER),
    pass: getEnvVar(SMTP.SMTP_PASSWORD),
  },
});
export const sendEmail = async (options) => {
  return await transporter.sendMail(options);

  //   try {
  //     const result = await transporter.sendMail(options);
  //     console.log('✅ Email sent successfully:', result);
  //     return result;
  //   } catch (error) {
  //     console.error('❌ Email send failed:', error);
  //     throw error;
  //   }
};
