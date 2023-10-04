import { IGenOTP } from '../type'

const generateOTP = (length: number = 5): IGenOTP => {
    let totp: string = ''
    const digits: string = '0918273645'
    for (let i = 0; i < length; i++) {
        totp += digits[Math.floor(Math.random() * length)]
    }

    const currentDate: Date = new Date()
    const expiryDate: Date = new Date(
        currentDate.setMinutes(currentDate.getMinutes() + 30)
    )

    return {
        totp,
        totp_expiry: expiryDate.toISOString()
    }
}

export default generateOTP