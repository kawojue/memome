"use client"
import { FC } from 'react'
import notify from '@/utils/notify'
import AuthLayout from './AuthLayout'
import Input from '@/components/Input'
import { UserStore } from '@/utils/store'
import { axiosReq } from '@/app/api/axios'
import throwError from '@/utils/throwError'
import { useRouter } from 'next/navigation'
import { AxiosResponse, AxiosError } from 'axios'

const Login: FC<Login> = ({
    title,
    method,
    pathName = 'login',
    btnLabel = 'Log In',
}) => {
    const router = useRouter()
    const {
        resetStates, setLoading, userId,
        setPassword, password, setUserId,
    } = UserStore()

    const handleLogin = async () => {
        setLoading(true)
        await axiosReq.post('/auth/login', { userId, password })
            .then((res: AxiosResponse) => {
                resetStates()
                notify('success', res.data?.msg)
                setTimeout(() => {
                    router.push('/profile')
                }, 300)
            }).catch((err: AxiosError) => throwError(err))
            .finally(() => setLoading(false))
    }

    return (
        <AuthLayout
            title={title}
            method={method}
            pathName={pathName}
            btnLabel={btnLabel}
            handler={handleLogin}>
            <article className='flex flex-col gap-5'>
                <Input
                    type='text'
                    label='Email or Username'
                    value={userId}
                    onChange={setUserId}
                />
                <Input
                    type='password'
                    label='Password'
                    value={password}
                    placeholder='********'
                    onChange={setPassword}
                />
            </article>
        </AuthLayout>
    )
}

export default Login