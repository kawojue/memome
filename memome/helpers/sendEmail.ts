import { IMail } from '../type'
import plunk from '../configs/plunk.config'
import transporter from '../configs/nodeMailer.config'

const sendPlunkEmail = async ({ to, subject, body }: IMail) => {
    try {
        await plunk.emails.send({ to, subject, body })
    } catch (err: unknown) {
        console.log(err)
    }
}

const sendNodeEmail = async ({ to, subject, body }: IMail) => {
    await transporter.sendMail({
        from: `Muyiwa at Memome <memome.one>`,
        to,
        subject,
        html: body,
    })
}

export { sendPlunkEmail, sendNodeEmail }