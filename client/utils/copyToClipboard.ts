const copyToClipboard = async (
    value: string,
    setCopy: (copy: string) => void
) => {
    try {
        await navigator.clipboard.writeText(value)
        setCopy('Link Copied!')
        setTimeout(() => {
            setCopy('Copy to clipboard')
        }, 1200)
    } catch (err) {
        setCopy('Failed to copy!')
    }
}

export { copyToClipboard }