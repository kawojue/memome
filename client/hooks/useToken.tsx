"use client"
import { useEffect } from 'react'
import getCookie from '@/utils/getCookie'
import { UserStore } from '@/utils/store'

const useToken = () => {
    const { token, setToken } = UserStore()

    useEffect(() => {
        const access_token = getCookie('access_token')

        setToken(access_token)
    }, [setToken])

    return token
}

export default useToken