import { sendNodeEmail } from '../helpers/sendEmail'

const sendOTP = async (otp: string, email: string) => {
    await sendNodeEmail({
        to: email,
        subject: 'One-time password.',
        body: `<h3>${otp}<h3>`
    })
}

export default sendOTP