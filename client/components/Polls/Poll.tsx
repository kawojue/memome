"use client"
import { FC } from 'react'
import Image from 'next/image'
import Options from './Options'
import download from '@/utils/download'
import { BsDownload } from '@/public/icons/ico'
import { prompt, questrial } from '@/public/fonts/f'
import { expiryPeriod, getPeriod } from '@/utils/period'

const Poll: FC<{ poll: MyPoll | undefined }> = ({ poll }) => {
    const titles = poll?.title?.split('\n')

    const expiry = (): string => {
        const nowInSeconds = Math.floor(new Date().getTime() / 1000)
        const expiryDateInSeconds = Math.floor(poll?.expiry ? new Date(poll.expiry).getTime() / 1000 : 0)

        if (nowInSeconds > expiryDateInSeconds) {
            return "Expired"
        }

        return expiryPeriod(poll?.expiry!)
    }

    return (
        <section
            className={`rounded-lg bg-clr-0 p-5 w-full`}
            style={{
                position: `relative`,
                boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px`
            }}>
            {poll?.title &&
                <div className={`${questrial.className} flex flex-col gap-0.5 w-full text-[14px] md:text-[16px] text-clr-13 `}>
                    {titles?.map((title, index) => (
                        <span
                            key={index}
                            className='break-words'>
                            {title}
                        </span>
                    ))}
                </div>}
            {poll?.files?.length && poll.files.length > 0 ?
                <article
                    className='w-full md:h-[12rem] h-[10rem] flex gap-1 object-cover overflow-hidden mt-2'>
                    {poll?.files?.map((file) => (
                        <div
                            key={file?.idx}
                            className='w-full h-full'>
                            {file?.type === 'video/mp4' ?
                                <video
                                    controls
                                    width="300"
                                    height="300"
                                    className='w-full h-full overflow-hidden object-cover rounded-md shadow-sm'>
                                    <source
                                        src={file?.url}
                                        type={file?.type}
                                    />
                                    Your browser does not support the video tag.
                                </video> :
                                <div className='relative w-full h-full shadow-sm overflow-hidden'>
                                    <Image
                                        width={300}
                                        height={300}
                                        loading='lazy'
                                        src={file?.url}
                                        alt={file.type}
                                        className='w-full h-full object-cover rounded-md'
                                    />
                                    <button
                                        onClick={() => download(file.url)}
                                        className='absolute bottom-3 right-4 text-base font-semibold text-black'>
                                        <BsDownload />
                                    </button>
                                </div>
                            }
                        </div>
                    ))}
                </article> : ''}
            <Options poll={poll} />
            <article className='w-full flex justify-between items-center'>
                <div className={`${prompt.className} flex gap-0.5 text-xs absolute bottom-1 text-clr-15`}>
                    <span>Created</span>
                    <span>&#8226;</span>
                    <span>{getPeriod(poll?.date!)}</span>
                </div>
                {poll?.expiry &&
                    <div className='text-xs absolute top-1 right-2 text-clr-13'>
                        {expiry() === 'Expired' ?
                            <span>Expired</span> :
                            <span>Expires &#8226; {expiry()}</span>
                        }
                    </div>
                }
            </article>
        </section>
    )
}

export default Poll