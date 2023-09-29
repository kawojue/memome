import { Request } from 'express'

const getIpAddress = (req: Request): string => {
    const remoteAddress = req.ip
    let ipAddress: string | undefined

    if (remoteAddress) {
        if (remoteAddress.includes(':')) { // IPv6 address
            ipAddress = remoteAddress.replace('[', '').replace(']', '')
        } else {
            ipAddress = remoteAddress // IPv4 address
        }
    }

    return ipAddress || ''
}

export { getIpAddress }