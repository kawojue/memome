import { Transporter, createTransport } from 'nodemailer'

const transporter: Transporter = createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    service: 'gmail',
    requireTLS: true,
    auth: {
        user: process.env.EMAILER!,
        pass: process.env.EMAILER_PSWD!
    }
})

export default transporter