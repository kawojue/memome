/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import notify from '@/utils/notify'
import NavBar from '@/components/Nav'
import Input from '@/components/Input'
import { UserStore } from '@/utils/store'
import { axiosReq } from '@/app/api/axios'
import throwError from '@/utils/throwError'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/components/AuthLayout'
import { AxiosError, AxiosResponse } from 'axios'

const page = () => {
    const router = useRouter()
    const { email, setEmail, setLoading } = UserStore()

    const handleReqeustOTP = async () => {
        setLoading(true)
        await axiosReq.post('/auth/req-otp', { email })
            .then((res: AxiosResponse) => {
                notify('success', res.data?.msg)
                setTimeout(() => {
                    router.push('/password/reset')
                }, 300)
            }).catch((err: AxiosError) => {
                throwError(err)
            }).finally(() => setLoading(false))
    }

    return (
        <>
            <NavBar isAuthenticated={false} />
            <form
                onSubmit={(e) => e.preventDefault()}
                className='card w-[92vw] max-w-[500px] mx-auto mt-3 mb-10 px-5 py-7'>
                <AuthLayout
                    btnLabel='Send OTP'
                    title='Find your account'
                    handler={handleReqeustOTP}>
                    <Input
                        type='email'
                        label='Email'
                        value={email}
                        onChange={setEmail}
                    />
                </AuthLayout>
            </form>
        </>
    )
}

export default page