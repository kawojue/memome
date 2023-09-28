import { generativeApi } from '@/app/api/axios'

const genMsg = async (msg_type: GenMsgType): Promise<string> => {
    const response = await generativeApi.get(`/questions/${msg_type}?choice=random`)
    return response.data?.question
}

export default genMsg