import notify from '@/utils/notify'
import { ChangeEvent } from 'react'
import MaxSize from '@/enums/fileMaxSizes'

const checkFile = (
    file: any,
    maxSize: MaxSize,
    ...extensions: string[]
): boolean => {
    if (!file) return false
    const { name, size }: any = file
    const split: string[] = name.split('.')
    const extension: string = split[split.length - 1]
    if (extensions.includes(extension) && size <= maxSize) {
        return true
    }
    return false
}

const blob = (
    e: ChangeEvent<HTMLInputElement>,
    set: (get: string) => void,
    maxSize: MaxSize,
    ...extensions: string[]
): void => {
    const file: any = e.target.files![0]
    const reader: FileReader = new FileReader()
    if (checkFile(file, maxSize, ...extensions)) {
        reader.readAsDataURL(file)
        reader.onload = () => {
            set(reader.result as string)
        }
    } else {
        notify('error', 'File size or format is not allowed.')
    }
}

export default blob