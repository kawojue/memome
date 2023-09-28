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
import { AxiosResponse, AxiosError } from 'axios'

const page = () => {
    const router = useRouter()
    const {
        email, setPassword, password,
        setEmail, resetStates, password2,
        setPassword2, setLoading,
    } = UserStore()

    const handleSignup = async () => {
        setLoading(true)
        await axiosReq.post('/auth/signup', {
            email, password, password2
        }).then((res: AxiosResponse) => {
            resetStates()
            setPassword2("")
            notify('success', res.data?.msg)
            setTimeout(() => {
                router.push('/login')
            }, 300)
        }).catch((err: AxiosError) => throwError(err))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <NavBar
                pathName='signup'
                isAuthenticated={false}
            />
            <form
                onSubmit={(e) => e.preventDefault()}
                className='card w-[92vw] max-w-[500px] mx-auto mt-3 mb-10 px-5 py-7'>
                <AuthLayout
                    method='home'
                    title='Signup'
                    pathName='signup'
                    btnLabel='Sign Up'
                    handler={handleSignup}>
                    <article className='flex flex-col gap-5'>
                        <Input
                            type='email'
                            label='Email'
                            value={email}
                            placeholder='example@mail.com'
                            onChange={setEmail}
                        />
                        <Input
                            type='password'
                            label='Password'
                            value={password}
                            onChange={setPassword}
                        />
                        <Input
                            type='password'
                            label='Confirm Password'
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