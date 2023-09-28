import axiosStatic, { AxiosInstance } from 'axios'

let refSubs = []
let isRef = false
const isProd = process.env.NODE_ENV === 'production'

const baseUrl = isProd ? process.env.NEXT_PUBLIC_AUTH_URL : 'http://localhost:2002'
const generativeUrl = isProd ? process.env.NEXT_PUBLIC_GEN_URL : 'http://localhost:1002'

const axios: AxiosInstance = axiosStatic.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

axios.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (error.response.status === 401) {
            const req = error.config

            if (!isRef) {
                isRef = true
                try {
                    await axios.post('/auth/refresh')
                    return axios(req)
                } catch (err) {
                    return Promise.reject(err)
                } finally {
                    isRef = false
                }
            } else {
                return new Promise((resolve) => {
                    refSubs.push(() => {
                        resolve(axios(req))
                    })
                })
            }
        }
        return Promise.reject(error)
    }
)

const axiosReq: AxiosInstance = axiosStatic.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

const generativeApi = axiosStatic.create({
    baseURL: generativeUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios
export { generativeApi, axiosReq }