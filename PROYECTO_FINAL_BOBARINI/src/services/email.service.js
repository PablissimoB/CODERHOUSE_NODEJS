import nodemailer from 'nodemailer'
import { EMAIL_PASS, EMAIL_USER } from '../config.js'
class EmailService {

  constructor() {
    this.transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    })
  }

  async send(destinatario, asunto, mensaje) {
    const emailOptions = {
      from: EMAIL_USER,
      to: destinatario,
      subject: asunto,
      text: mensaje
    }

    await this.transport.sendMail(emailOptions)
  }
}

export const emailService = new EmailService()
