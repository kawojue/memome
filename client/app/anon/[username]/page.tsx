/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Link from 'next/link'
import Image from 'next/image'
import NavBar from '@/components/Nav'
import useToken from '@/hooks/useToken'
import { axiosReq } from '@/app/api/axios'
import throwError from '@/utils/throwError'
import CheckMark from '@/components/CheckMark'
import { LoaderTwo } from '@/components/Loader'
import { useMessageStore } from '@/utils/store'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { notFound, useRouter } from 'next/navigation'
import TextEditor from '@/components/Messages/TextEditor'
import { lato, poppins, questrial } from '@/public/fonts/f'
import MediasUpload from '@/components/Messages/MediaUpload'
import { LuVerified, BsFillSendFill } from '@/public/icons/ico'

const page = ({ params: { username } }: Params) => {
    const token = useToken()
    const router = useRouter()
    const {
        setProgress, medias, loading, setLoading,
        setMedias, sent, resetStates, setSent, progress,
    } = useMessageStore()
    const textEditorRef = useRef<HTMLDivElement>(null)
    const [forbidden, setForbidden] = useState<boolean>(false)

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['anon-user'],
        queryFn: async () => {
            return await axiosReq.get(
                `/api/msg/anon/${username.toLowerCase().trim()}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            ).then((res: AxiosResponse) => {
                return res.data?.user
            }).catch((err: AxiosError) => {
                const statusCode: unknown = err.response?.status
                if (statusCode === 401 || statusCode === 404) {
                    setForbidden(true)
                } else {
                    throwError(err)
                }
            })
        },
        enabled: false
    })

    useEffect(() => {
        document.title = `${username} | Send me anonymous messages`
    }, [])

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

    if (forbidden) return notFound()

    const name = data?.username
    const avatar_url = data?.avatar?.url

    const sendMsg = async (): Promise<void> => {
        setLoading(true)

        const payload = {
            texts: textEditorRef.current ? textEditorRef.current.innerHTML : ''
        }

        const formData: FormData = new FormData()

        if (medias) {
            for (let i = 0; i < medias.length; i++) {
                formData.append('anon_files', medias[i], medias[i].name)
            }
        }

        for (const key in payload) {
            formData.append(key, payload[key as keyof typeof payload])
        }

        let totalContentLength = 0
        formData.forEach((value) => {
            if (value instanceof Blob) {
                totalContentLength += value.size
            }
        })

        await axiosReq.post(
            `/api/msg/anon/${username}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Content-Length': `${totalContentLength}`
                },
                onUploadProgress(progressEvent) {
                    const percentage = (progressEvent.loaded / (progressEvent.total || 1)) * 100
                    setProgress(percentage)
                },
            }
        ).then((res: AxiosResponse) => {
            resetStates()
            setSent(true)
            setTimeout(() => {
                router.push('/profile')
            }, 2500)
        }).catch((err: AxiosError) => throwError(err))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <NavBar
                isAuthenticated={data?.isAuthenticated}
                data={avatar_url ? { avatar_url } : { username: name }}
            />
            <CheckMark
                get={sent}
                set={setSent}
            />
            <main className='w-full min-h-screen bg-clr-12 pt-5'>
                <section className='w-[94vw] max-w-[700px] flex flex-col gap-7 mx-auto'>
                    <article className='flex gap-4 items-center w-full'>
                        <div>
                            <div className='flex justify-center items-center h-[5.5rem] w-[5.5rem] rounded-full overflow-hidden border-[2px] bg-clr-0 border-clr-5 flex-grow-0'>
                                {avatar_url ?
                                    <Image
                                        priority
                                        width={300}
                                        height={300}
                                        alt='avatar'
                                        src={avatar_url}
                                        className='object-cover w-full h-full'
                                    /> :
                                    <span className={`${lato.className} text-clr-2 text-3xl font-bold h-fit`}>
                                        {name ? name[0].toUpperCase() : "0"}
                                    </span>
                                }
                            </div>
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <div className={`${questrial.className} flex gap-2 items-center text-clr-2 font-medium text-lg`}>
                                <Link
                                    href={`/${data?.username}`}
                                    target='_blank'>
                                    @{data?.username}
                                </Link>
                                {data?.verified && <LuVerified />}
                            </div>
                            <p className={`${poppins.className} text-clr-13 text-sm break-words`}>
                                {data?.bio}
                            </p>
                        </div>
                    </article>
                    <article
                        className={`rounded-lg bg-clr-0 p-5 relative ${(data?.allowTexts && data?.allowFiles) ? 'min-h-[450px]' : (!data?.allowTexts && data?.allowFiles) ? 'min-h-[270px]' : (data?.allowTexts && !data?.allowFiles) ? 'min-h-[340px]' : 'min-h-[150px]'}`}
                        style={{
                            boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px`
                        }}>
                        {(data?.allowTexts === false && data?.allowFiles === false) ?
                            <p className={`${poppins.className} text-xl font-medium tracking-wide text-clr-13`}>
                                {`They've currently turned off all their channels.`}
                            </p> :
                            <>
                                {!loading ?
                                    <button
                                        className={`rounded-full px-3 py-1.5 font-medium tracking-wider bg-clr-1 text-clr-11 flex gap-2 items-center text-lg hover:bg-clr-8 hover:text-clr-11 ${questrial.className} absolute bottom-2.5 right-3.5`}
                                        onClick={async () => await sendMsg()}>
                                        <BsFillSendFill />
                                        <span>Send</span>
                                    </button> :
                                    <div className='w-[100px] bg-clr-6 h-5 overflow-hidden rounded-full absolute bottom-2.5 right-3.5'>
                                        <div
                                            className='h-full bg-clr-1 rounded-full transition-all duration-500 ease-in-out'
                                            style={{
                                                width: `${progress}%`
                                            }} />
                                    </div>}
                                {(!data?.allowTexts && !data?.allowFiles) || <h5 className={`${poppins.className} absolute top-2 left-4 text-lg text-clr-13 tracking-wider font-semibold`}>
                                    {`I won't know who sent it!`}
                                </h5>}
                                {data?.allowTexts && <TextEditor
                                    textEditorRef={textEditorRef}
                                    msgType={data?.msg_type || 'all'}
                                />}
                                {data?.allowFiles && <MediasUpload
                                    get={medias}
                                    set={setMedias}
                                    id='anon_files'
                                />}
                            </>}
                    </article>
                </section>
            </main>
        </>
    )
}

export default page