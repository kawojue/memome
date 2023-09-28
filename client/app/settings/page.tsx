/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useState } from 'react'
import axios from '../api/axios'
import genBio from '@/lib/genBio'
import notify from '@/utils/notify'
import MyPage from '@/components/MyPage'
import { UserStore } from '@/utils/store'
import Input from '@/components/EditInput'
import SwitchBtn from '@/components/Switch'
import throwError from '@/utils/throwError'
import { AxiosError, AxiosResponse } from 'axios'
import { inter, poppins } from '@/public/fonts/f'
import { LoaderThree } from '@/components/Loader'
import ListboxComponent from '@/components/ListBox'

const page = () => {
    const listMsgs = [
        'All',
        'Nasty',
        'Normal',
        'Relationship',
    ]

    const {
        bio, setBio,
        setShowLevels, allowTexts, showLevels,
        allowFiles, setAllowTexts, setAllowFiles,
    } = UserStore()

    const [bioLoad, setBioLoad] = useState<boolean>(false)
    const [msgLoad, setMsgLoad] = useState<boolean>(false)

    const [selectedMsg, setSelectedMsg] = useState<string>(listMsgs[0])

    const toggler = async (type: string): Promise<void> => {
        const originalValue = type === 'levels' ?
            showLevels : type === 'texts' ?
                allowTexts : allowFiles
        const newValue = !originalValue

        switch (type) {
            case 'levels':
                setShowLevels(newValue)
                break
            case 'texts':
                setAllowTexts(newValue)
                break
            case 'files':
                setAllowFiles(newValue)
                break
            default:
                break
        }

        await axios.get(
            `/auth/api/settings/toggle/${type}`,
        ).catch((err: AxiosError) => {
            switch (type) {
                case 'levels':
                    setShowLevels(originalValue)
                    break
                case 'texts':
                    setAllowTexts(originalValue)
                    break
                case 'files':
                    setAllowFiles(originalValue)
                    break
                default:
                    break
            }
            throwError(err)
        })
    }

    const editBio = async (): Promise<void> => {
        setBioLoad(true)
        await axios.patch(
            '/auth/api/bio',
            { bio }
        ).then((res: AxiosResponse) => notify('success', 'Successful.'))
            .catch((err: AxiosError) => throwError(err))
            .finally(() => setBioLoad(false))
    }

    const supriseMe = async () => setBio(await genBio() || '')

    const handleMsgSelection = async (): Promise<void> => {
        setMsgLoad(true)
        await axios.get(
            `/auth/api/settings/msg-type?type=${selectedMsg.toLowerCase()}`,
        ).then((res: AxiosResponse) => notify('success', 'Generated Message Changed.'))
            .catch((err: AxiosError) => throwError(err))
            .finally(() => setMsgLoad(false))
    }

    return (
        <MyPage param='settings'>
            {({ data }) => (
                <main className='profile'>
                    <article className="profile-header">
                        <h1 className='text-2xl text-clr-13 font-semibold tracking-wide md:text-3xl'>
                            Settings
                        </h1>
                    </article>
                    <section className={`${poppins.className} flex flex-col gap-10 text-clr-13 mb-10`}>
                        <article className='rounded-lg border-[0.75px] overflow-hidden'>
                            <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                    Edit your Bio
                                </h3>
                                <Input
                                    type='text'
                                    label='Bio'
                                    value={bio}
                                    maxLength={150}
                                    className='w-full'
                                    onChange={setBio}
                                />
                            </div>
                            <footer className='profile-footer'>
                                <button
                                    onClick={async () => await supriseMe()}
                                    className='save-btn rounded-md'>
                                    Suprise Me
                                </button>
                                <button
                                    className='save-btn-2'
                                    disabled={bio === data?.Profile?.bio}
                                    onClick={async () => await editBio()}>
                                    {bioLoad ? <LoaderThree /> : 'Save'}
                                </button>
                            </footer>
                        </article>

                        <article className='rounded-lg border-[0.75px]  overflow-hidden'>
                            <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                    Toggle Levels
                                </h3>
                                <SwitchBtn
                                    get={showLevels}
                                    set={setShowLevels}
                                    handler={async () => await toggler('levels')}
                                />
                            </div>
                            <footer className='profile-footer'>
                                <p className='text-clr-17 text-xs md:text-sm'>
                                    {showLevels ? 'Toggle to hide your Profile Levels.' : 'Toggle to show your Profile Levels'}
                                </p>
                            </footer>
                        </article>

                        <article className='rounded-lg border-[0.75px]  overflow-hidden'>
                            <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                    Toggle Texts
                                </h3>
                                <SwitchBtn
                                    get={allowTexts}
                                    set={setAllowTexts}
                                    handler={async () => await toggler('texts')}
                                />
                            </div>
                            <footer className='profile-footer'>
                                <p className='text-clr-17 text-xs md:text-sm'>
                                    {allowTexts ? 'Toggle to deny Anonymous Text Messages.' : 'Toggle to allow Anonymous Text Messages.'}
                                </p>
                            </footer>
                        </article>

                        <article className='rounded-lg border-[0.75px]  overflow-hidden'>
                            <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                    Toggle Media
                                </h3>
                                <SwitchBtn
                                    get={allowFiles}
                                    set={setAllowFiles}
                                    handler={async () => await toggler('files')}
                                />
                            </div>
                            <footer className='profile-footer'>
                                <p className='text-clr-17 text-xs md:text-sm'>
                                    {allowFiles ? 'Toggle to deny Anonymous Media.' : 'Toggle to allow Anonymous Media.'}
                                </p>
                            </footer>
                        </article>

                        <article className='relative rounded-lg border-[0.75px] overflow-hidden'>
                            <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                    Generated Message
                                </h3>
                                <ListboxComponent
                                    listMsgs={listMsgs}
                                    selected={selectedMsg}
                                    setSelected={setSelectedMsg}
                                    current={data?.Settings?.gen_msg_type}
                                />
                            </div>
                            <footer className='profile-footer'>
                                <p className='text-clr-17 text-xs md:text-sm'>
                                    Please select your preferred option.
                                </p>
                                <button
                                    className='save-btn-2'
                                    disabled={selectedMsg?.toLowerCase() === data?.Settings?.gen_msg_type}
                                    onClick={async () => await handleMsgSelection()}>
                                    {msgLoad ? <LoaderThree /> : 'Save'}
                                </button>
                            </footer>
                        </article>
                    </section>
                </main>
            )}
        </MyPage>
    )
}

export default page