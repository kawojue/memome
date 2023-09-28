const getCookie = (cookieName: string): string => {
    const cookie = document.cookie
        .split('; ')
        .find((row: any) => row.startsWith(`${cookieName}=`))
        ?.split('=')[1] || ''

    return cookie
}

export default getCookie