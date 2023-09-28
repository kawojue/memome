import { CipherAction } from '../type'
const cipher = require('text-encryption')

const { TEXT_KEY } = process.env

const enc_decrypt = async (text: string, action: CipherAction) => {
    if (!text) return

    if (action === 'e') {
        return await cipher.encrypt(text, TEXT_KEY)
    } else if (action === 'd') {
        return await cipher.decrypt(text, TEXT_KEY)
    } else {
        return
    }
}

export { enc_decrypt }