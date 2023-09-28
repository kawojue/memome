/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useEffect } from 'react'
import NavBar from '@/components/Nav'
import useToken from '@/hooks/useToken'
import { axiosReq } from '@/app/api/axios'
import Profile from '@/components/Profile'
import throwError from '@/utils/throwError'
import { LoaderTwo } from '@/components/Loader'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

const page = ({ params: { username } }: Params) => {
    const token = useToken()
    const { refetch, isLoading, data } = useQuery({
        queryKey: ['user_profile'],
        queryFn: async () => {
            return await axiosReq.get(
                `/api/user/${username?.toLowerCase()?.trim()}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            ).then((res: AxiosResponse) => {
                return res.data || {}
            }).catch((err: AxiosError) => throwError(err))
        },
        enabled: false
    })

    useEffect(() => {
        if (token) {
            refetch()
        } else {
            if (token === '') {
                refetch()
            }
        }
    }, [token])

    if (isLoading) return <LoaderTwo />

    const name = data?.authUser?.username
    const avatar_url = data?.authUser?.Profile?.avatar?.url

    return (
        <>
            <NavBar
                isAuthenticated={data?.authUser?.isAuthenticated}
                data={avatar_url ? { avatar_url } : { username: name }}
            />

            <Profile
                user={data?.user}
                pathName='user'
                username={username}
            />
        </>
    )
}

export default page