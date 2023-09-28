import { sendNodeEmail } from '../helpers/sendEmail'

const newLogin = async (
    email: string, username: string,
    userAgent: string, ipAddress: string
) => {
    await sendNodeEmail({
        to: email,
        subject: 'Login Notification',
        body: `.. coming back`
    })
}

export default newLogin