import { saveAs } from 'file-saver'

const download = (url: string): void => {
    const splitted = url.split('/')
    const fileName = splitted[splitted.length - 1]

    saveAs(url, `memome_${fileName}`)
}

export default download