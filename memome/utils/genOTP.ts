import { IGenOTP } from '../type'

export default function generateOTP(length: number = 5): IGenOTP {
    let totp: string = ''
    const digits: string = '0918273645'
    for (let i = 0; i < length; i++) {
        totp += digits[Math.floor(Math.random() * length)]
    }

    return { totp, totp_expiry: Date.now() + 30 * 60 * 1000 }
}