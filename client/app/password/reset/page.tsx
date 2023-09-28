/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import notify from '@/utils/notify'
import NavBar from '@/components/Nav'
import Input from '@/components/Input'
import OtpInput from 'react-otp-input'
import { UserStore } from '@/utils/store'
import { axiosReq } from '@/app/api/axios'
import { useRouter } from 'next/navigation'
import { FcLock } from '@/public/icons/ico'
import throwError from '@/utils/throwError'
import AuthLayout from '@/components/AuthLayout'
import { AxiosError, AxiosResponse } from 'axios'

const page = () => {
    const router = useRouter()
    const {
        setLoading, password, setPassword2,
        otp, setOtp, setPassword, password2
    } = UserStore()

    const handlePswdReset = async () => {
        setLoading(true)
        await axiosReq.post(
            '/auth/verify', { otp, password, password2 }
        ).then((res: AxiosResponse) => {
            notify('success', res.data?.msg)
            setTimeout(() => {
                router.push('/login')
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
                    btnLabel='Reset'
                    handler={handlePswdReset}
                    title='Password Reset'>
                    <article className='flex flex-col gap-5'>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={5}
                            renderSeparator={<span> <FcLock /> </span>}
                            containerStyle='w-full flex gap-1.5 font-semibold'
                            inputStyle='outline-none rounded-full text-lg text-clr-4 border-[2px] border-clr-3 focus:border-clr-1 focus:bg-clr-11 trans'
                            renderInput={(props) => <input {...props} />}
                        />
                        <Input
                            type='password'
                            label='New Password'
                            value={password}
                            onChange={setPassword}
                        />
                        <Input
                            type='password'
                            label='Confirm New Password'
                            value={password2}
                            onChange={setPassword2}
                        />
                    </article>
                </AuthLayout>
            </form>
        </>
    )
}

export default page