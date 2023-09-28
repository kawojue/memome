import { generativeApi } from '@/app/api/axios'

const genBio = async (): Promise<string> => {
    const response = await generativeApi.get(`/bios?choice=random`)
    return response.data?.bio
}

export default genBio