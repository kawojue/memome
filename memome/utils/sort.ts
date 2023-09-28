const sortByDates = (array: any[]): any => {
    return array.sort((a, b) => {
        const dateA: any = new Date(a.date)
        const dateB: any = new Date(b.date)

        return dateB - dateA
    })
}

export default sortByDates