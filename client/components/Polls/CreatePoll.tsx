"use client"
import { v4 as uuid } from 'uuid'
import axios from '@/app/api/axios'
import Share from '../Modals/Share'
import Modal from '../Modals/Modal'
import { FC, useState } from 'react'
import { usePoll } from '@/utils/store'
import { LoaderThree } from '../Loader'
import throwError from '@/utils/throwError'
import {
    AiOutlineMinusSquare, AiOutlinePlusSquare
} from '@/public/icons/ico'
import { AxiosError, AxiosResponse } from 'axios'
import MediasUpload from '../Messages/MediaUpload'
import { inter, questrial } from '@/public/fonts/f'

const CreatePoll: FC<State<boolean>> = ({ get, set }) => {
    const {
        setTitle, options, title,
        hosting, setHosting, pollUrl,
        setPollUrl, setPollToDefault,
        medias, setMedias, setOptions,
    } = usePoll()
    const [sharePollModal, setSharePollModal] = useState<boolean>(false)

    const handlePollHost = async (): Promise<void> => {
        setHosting(true)

        const formData: FormData = new FormData()

        formData.append('title', title)

        if (medias) {
            for (let i = 0; i < medias.length; i++) {
                formData.append('poll_files', medias[i], medias[i].name)
            }
        }

        for (const option of options) {
            formData.append('options', option.option)
        }

        await axios.post(
            '/api/poll/create',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then((res: AxiosResponse) => {
            set(false)
            setPollToDefault()
            setSharePollModal(true)
            setPollUrl(res.data?.url)
        }).catch((err: AxiosError) => throwError(err))
            .finally(() => setHosting(false))
    }

    return (
        <>
            <Share
                get={sharePollModal}
                set={setSharePollModal}
                data={{
                    share: `Vote here: ${pollUrl}`
                }}
                title='Share your poll link for people to vote.'
            />
            <Modal
                get={get}
                set={set}>
                <section className='mb-7'>
                    <h4 className={`text-sm text-clr-13 mb-3 font-medium ${inter.className}`}>
                        Create a new Poll
                    </h4>
                    <textarea
                        value={title}
                        maxLength={178}
                        placeholder='Question/Title..'
                        onChange={(e) => setTitle(e.target.value)}
                        className={`${questrial.className} text-clr-16 outline-none border-b-[0.5px] focus:border-clr-15 px-1 py-0.5 w-full bg-clr-12 resize-none`}
                    />
                    <article className='flex flex-col gap-2 mt-5 w-full'>
                        {options.map(({ id, option }) => (
                            <div
                                key={id}
                                className='flex gap-3 w-full'>
                                <input
                                    type='text'
                                    value={option}
                                    maxLength={32}
                                    onChange={(e) => {
                                        setOptions(options.map(
                                            (option) => option.id === id ? {
                                                ...option,
                                                option: e.target.value
                                            } : option
                                        ))
                                    }}
                                    className={`${questrial.className} text-clr-16 outline-none border-[0.5px] focus:border-clr-15 px-1 py-0.5 w-full bg-clr-12 rounded-full`}
                                />
                                {options.length > 2 &&
                                    <button
                                        onClick={() => {
                                            if (options.length > 2) {
                                                setOptions(options.filter((option) => option.id !== id))
                                            }
                                        }}
                                        className={`p-1`}>
                                        <AiOutlineMinusSquare className='text-clr-16' />
                                    </button>}
                            </div>
                        ))}
                        {options.length < 10 &&
                            <button
                                onClick={() => {
                                    if (options.length < 10) {
                                        setOptions([...options, { id: uuid(), option: '' }])
                                    }
                                }}
                                className={`${questrial.className} tracking-wide w-full flex justify-center items-center gap-3 mt-1`}>
                                <span className='text-xs md:text-sm'>Add Option</span>
                                <AiOutlinePlusSquare className='text-lg' />
                            </button>}
                    </article>
                    <MediasUpload
                        get={medias}
                        set={setMedias}
                        id='poll_files'
                    />
                </section>
                <button
                    onClick={async () => await handlePollHost()}
                    className={`save-btn-2 fixed bottom-3 right-3`}>
                    {hosting ? <LoaderThree /> : 'Host'}
                </button>
            </Modal>
        </>
    )
}

export default CreatePoll