import { parseISO, formatDistanceToNow } from 'date-fns'

const getPeriod = (timestamp: string): string => {
    let period: string = ''
    if (timestamp) {
        const date: Date = parseISO(timestamp)
        const timePeriod: string = formatDistanceToNow(date)
        period = `${timePeriod}..`
    }
    return period
}

function expiryPeriod(expiryISOString: string): string {
    const expiryDate = new Date(expiryISOString)
    const currentDate = new Date()
    const timeDifference = expiryDate.getTime() - currentDate.getTime()
    const timeDifferenceInSeconds = Math.floor(timeDifference / 1000)

    const timeUnits: {
        unit: string
        factor: number
    }[] = [
            { unit: "year", factor: 31536000 },
            { unit: "week", factor: 604800 },
            { unit: "day", factor: 86400 },
            { unit: "hour", factor: 3600 },
            { unit: "minute", factor: 60 },
        ]

    for (const unit of timeUnits) {
        const unitCount = Math.floor(timeDifferenceInSeconds / unit.factor)
        if (unitCount >= 1) {
            return `In ${unitCount} ${unit.unit}${unitCount > 1 ? 's' : ''}`
        }
    }

    return "In a few seconds"
}

export { getPeriod, expiryPeriod }