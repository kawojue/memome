import { generativeApi } from '@/app/api/axios'

const handleLevel = async (level: LevelType, point: number) => {
    const { data } = await generativeApi.get(
        `/levels/${level}?point=${point}`
    )
    return data
}

export { handleLevel }