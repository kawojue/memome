import crypto from 'crypto'

const genFileName = () => {
    return crypto.randomBytes(8).toString('hex')
}

export default genFileName