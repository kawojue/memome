const formatNumber = (n: number): string => {
    if (!Number(n)) {
        return "0"
    }

    const k = 1_000
    const m = 1_000_000

    if (n >= m) {
        return (n / m).toFixed(1) + 'm'
    } else if (n >= k) {
        return (n / k).toFixed(1) + 'k'
    } else {
        return n.toString()
    }
}

const formatSize = (size: number) => {
    let format = ''

    const KB = 1_024
    const MB = 1_024 * 1_024

    if (size >= MB) {
        format = `${(size / MB).toFixed(2)}MB`
    } else if (size >= KB) {
        format = `${(size / KB).toFixed(2)}KB`
    } else {
        format = size.toString()
    }

    return format
}

export { formatNumber, formatSize }