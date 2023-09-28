import { sendPlunkEmail } from '../helpers/sendEmail'

const sendOTP = async (otp: string, email: string) => {
    await sendPlunkEmail({
        to: email,
        subject: 'One-time password.',
        body: `.. coming back`
    })
}

export default sendOTP