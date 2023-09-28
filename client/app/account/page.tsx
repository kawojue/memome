/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from '../api/axios'
import { useState } from 'react'
import notify from '@/utils/notify'
import MyPage from '@/components/MyPage'
import Input from '@/components/EditInput'
import SwitchBtn from '@/components/Switch'
import throwError from '@/utils/throwError'
import { inter, poppins } from '@/public/fonts/f'
import { AxiosError, AxiosResponse } from 'axios'
import { LoaderThree } from '@/components/Loader'
import { UserStore, useModalStore } from '@/utils/store'
import DeleteAccount from '@/components/Modals/DeleteAccount'

const page = () => {
    const {
        deleteAccountModal,
        setDeleteAccountModal
    } = useModalStore()

    const {
        userId, setUserId, setPassword, setDisabled,
        password, setPassword2, password2, disabled,
    } = UserStore()

    const [pswd, setPswd] = useState<string>('')
    const [userLoading, setUserLoading] = useState<boolean>(false)
    const [pswdLoading, setPswdLoading] = useState<boolean>(false)

    const editPswd = async (): Promise<void> => {
        setPswdLoading(true)
        await axios.patch(
            '/auth/api/account/reset-pswd',
            { pswd, password, password2 }
        ).then((res: AxiosResponse) => {
            notify('success', res.data?.msg)
        }).catch((err: AxiosError) => throwError(err))
            .finally(() => setPswdLoading(false))
    }

    const editUsername = async (): Promise<void> => {
        setUserLoading(true)
        await axios.patch(
            '/auth/api/account/username',
            { username: userId }
        ).then((res: AxiosResponse) => {
            setUserId(res.data?.username)
            notify('success', res.data?.msg)
        }).catch((err: AxiosError) => throwError(err))
            .finally(() => setUserLoading(false))
    }

    const toggleDisbility = async (): Promise<void> => {
        setDisabled(!disabled)
        await axios.get(
            '/auth/api/account/disable',
        ).catch((err: AxiosError) => {
            setDisabled(disabled)
            throwError(err)
        })
    }

    return (
        <MyPage param='account'>
            {({ data }) => {
                return (
                    <>
                        <DeleteAccount
                            get={deleteAccountModal}
                            set={setDeleteAccountModal}
                            title='Account Deletion'
                            data={data}
                        />
                        <main className='profile'>
                            <article className="profile-header">
                                <h1 className='text-2xl text-clr-13 font-semibold tracking-wide md:text-3xl'>
                                    Personal Account
                                </h1>
                            </article>
                            <section className={`${poppins.className} flex flex-col gap-10 text-clr-13 mb-10`}>
                                {/* Edit Username */}
                                <article className='rounded-lg border-[0.75px] overflow-hidden'>
                                    <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                        <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                            Your username
                                        </h3>
                                        <p className='text-[14px] text-clr-16'>
                                            This is your account username.
                                        </p>
                                        <Input
                                            type='text'
                                            value={userId}
                                            maxLength={32}
                                            label='memome.one/'
                                            onChange={setUserId}
                                        />
                                    </div>
                                    <footer className='profile-footer'>
                                        <p className='text-clr-17 text-xs md:text-sm'>
                                            Please use 32 characters at maximum.
                                        </p>
                                        <button
                                            className='save-btn-2'
                                            disabled={userId === data?.username}
                                            onClick={async () => await editUsername()}>
                                            {userLoading ? <LoaderThree /> : 'Save'}
                                        </button>
                                    </footer>
                                </article>
                                {/* Change Password */}
                                {data?.auth_method === 'local' && <article className='rounded-lg border-[0.75px]  overflow-hidden'>
                                    <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                        <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                            Change Password
                                        </h3>
                                        <div className='flex flex-col gap-2.5 w-full'>
                                            <Input
                                                type='text'
                                                value={pswd}
                                                maxLength={42}
                                                onChange={setPswd}
                                                className='w-full'
                                                label='Current Password'
                                            />
                                            <Input
                                                type='text'
                                                maxLength={42}
                                                value={password}
                                                className='w-full'
                                                label='New Password'
                                                onChange={setPassword}
                                            />
                                            <Input
                                                type='text'
                                                maxLength={42}
                                                value={password2}
                                                className='w-full'
                                                onChange={setPassword2}
                                                label='Confirm Password'
                                            />
                                        </div>
                                    </div>
                                    <footer className='profile-footer'>
                                        <p className='text-clr-17 text-xs md:text-sm'>
                                            Please choose a strong password.
                                        </p>
                                        <button
                                            className='save-btn-2'
                                            onClick={async () => await editPswd()}>
                                            {pswdLoading ? <LoaderThree /> : 'Save'}
                                        </button>
                                    </footer>
                                </article>}
                                {/* Account disabling */}
                                <article className='rounded-lg border-[0.75px]  overflow-hidden'>
                                    <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                        <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                            Your account is {disabled ? 'disabled' : 'enabled'}
                                        </h3>
                                        <SwitchBtn
                                            get={disabled}
                                            set={setDisabled}
                                            handler={toggleDisbility}
                                        />
                                    </div>
                                    <footer className='profile-footer'>
                                        <p className='text-clr-17 text-xs md:text-sm'>
                                            Toggle to make your account {disabled ? 'active.' : 'inactive.'}
                                        </p>
                                    </footer>
                                </article>
                                {/* Account Deletion */}
                                <article className='rounded-lg border-[0.75px]  overflow-hidden'>
                                    <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                        <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                            Delete Personal Account
                                        </h3>
                                        <p className='text-[14px] text-clr-16'>
                                            Permanently remove your Personal Account and all of its contents from Memome.
                                        </p>
                                    </div>
                                    <footer className='flex md:justify-between items-center flex-col text-center gap-3 px-7 py-2 bg-clr-20 w-full border-t-[0.75px]'>
                                        <p className='text-clr-17 text-xs md:text-sm'>
                                            This action is Irreversible, so please continue with caution.
                                        </p>
                                        <button onClick={() => setDeleteAccountModal(true)}
                                            className='bg-clr-18 hover:bg-clr-19 text-clr-0 hover:text-clr-12 rounded-lg px-3 py-1.5 text-sm md:text-base shadow-md trans'>
                                            Delete Personal Account
                                        </button>
                                    </footer>
                                </article>
                            </section>
                        </main >
                    </>
                )
            }}
        </MyPage>
    )
}

export default page