export type CipherAction = 'd' | 'e'

export type OTPAction = 'denied' | 'granted'

export interface IGenOTP {
    totp: string,
    totp_expiry: string
}

export interface ILimiter {
    max: number
    timerArr: number[]
    msg?: string
}

export interface IMail {
    to: string
    body: string
    subject: string
}