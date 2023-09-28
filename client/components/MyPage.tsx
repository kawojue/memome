/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from '@/app/api/axios'
import NavBar from '@/components/Nav'
import { UserStore } from '@/utils/store'
import throwError from '@/utils/throwError'
import { useRouter } from 'next/navigation'
import { LoaderTwo } from '@/components/Loader'
import { useEffect, useState, FC } from 'react'
import { AxiosError, AxiosResponse } from 'axios'

const MyPage: FC<MyPage> = ({ children, param }) => {
    const router = useRouter()
    const {
        setDisabled, setShowLevels, setBio,
        setUserId, setAllowTexts, setAllowFiles,
    } = UserStore()
    const [data, setData] = useState<any>({})
    const [auth, setAuth] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleMyPage = async (): Promise<void> => {
        setIsLoading(true)
        await axios.get(`/auth/api/${param}`)
            .then((res: AxiosResponse) => {
                setAuth(true)
                const user = res.data?.user || {}
                setData(user)
                switch (param) {
                    case 'account':
                        setUserId(user?.username)
                        setDisabled(user?.Account?.disabled)
                        break
                    case 'settings':
                        setBio(user?.Profile?.bio)
                        setAllowFiles(user?.Settings?.allow_files)
                        setShowLevels(user?.Settings?.show_levels)
                        setAllowTexts(user?.Settings?.allow_texts)
                        break
                    default:
                        setData(user)
                        break
                }
            }).catch((err: AxiosError) => {
                const statusCodes: unknown = err.response?.status
                if (statusCodes === 403) {
                    router.push('/login')
                } else {
                    throwError(err)
                }
            }).finally(() => setIsLoading(false))
    }

    useEffect(() => {
        handleMyPage()
    }, [])

    if (isLoading) return <LoaderTwo />

    const username = data?.username
    const avatar_url = data?.Profile?.avatar?.url

    return (
        <>
            <NavBar
                isAuthenticated={auth}
                data={avatar_url ? { avatar_url } : { username }}
            />
            {children({ data })}
        </>
    )
}

export default MyPage