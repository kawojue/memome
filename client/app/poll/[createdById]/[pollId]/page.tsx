/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Link from 'next/link'
import Image from 'next/image'
import NavBar from '@/components/Nav'
import Login from '@/components/Login'
import { usePoll } from '@/utils/store'
import useToken from '@/hooks/useToken'
import Poll from '@/components/Polls/Poll'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import throwError from '@/utils/throwError'
import Modal from '@/components/Modals/Modal'
import { LoaderTwo } from '@/components/Loader'
import { LuVerified } from '@/public/icons/ico'
import { AxiosError, AxiosResponse } from 'axios'
import axios, { axiosReq } from '@/app/api/axios'
import { lato, poppins, questrial } from '@/public/fonts/f'

const page = ({ params: { createdById, pollId } }: PollParams) => {
    const token = useToken()
    const [userData, setUserData] = useState<any>({})
    const [voterData, setVoterData] = useState<any>({})
    const [notExist, setNotExist] = useState<boolean>(false)

    const {
        isAuthenticated, setIsAuthenticated,
        pollLoad, setPollLoad, setPoll, poll,
    } = usePoll()

    const getPoll = async (): Promise<void> => {
        setPollLoad(true)
        setIsAuthenticated(false)
        await axiosReq.get(
            `/api/poll/get/${createdById}/${pollId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then((res: AxiosResponse) => {
            setPoll(res.data?.poll)
            setUserData(res.data?.user || {})
        }).catch((err: AxiosError) => {
            const statusCodes: unknown = err.response?.status
            if (statusCodes === 404) {
                setNotExist(true)
            } else {
                throwError(err)
            }
        }).finally(() => setPollLoad(false))
    }

    const getVoter = async (): Promise<void> => {
        await axios.get('/api/poll/voter')
            .then((res: AxiosResponse) => setVoterData(res.data?.voter || {}))
            .catch((err: AxiosError) => {
                const statusCodes: unknown = err.response?.status
                if (statusCodes === 403) {
                    setIsAuthenticated(true)
                }
            })
    }

    useEffect(() => {
        getVoter()
    }, [])

    useEffect(() => {
        if (token) {
            getPoll()
        } else {
            if (token === '') {
                getPoll()
            }
        }
    }, [createdById, pollId, token])

    useEffect(() => {
        let title
        if (poll?.title) {
            title = `Poll: ${poll.title.slice(0, 23)}..`
        } else {
            const formatOptions = poll?.options.map((option) => `${option.texts}`)
            title = `Vote here: ${formatOptions}`
        }

        document.title = title
    }, [poll?.options, poll?.title])

    useEffect(() => {
        let intervalId
        const refreshInterval = 1.5 * 60 * 1000

        const refreshPage = () => {
            window.location.reload()
        }

        if (poll?.hasVoted) {
            intervalId = setInterval(refreshPage, refreshInterval)
        }

        return () => clearInterval(intervalId!)
    }, [poll?.hasVoted])

    if (pollLoad) return <LoaderTwo />

    if (notExist) return notFound()

    const name = voterData?.username
    const avatar_url = voterData?.Profile?.avatar?.url

    return (
        <>
            <NavBar
                isAuthenticated={voterData?.isAuthenticated}
                data={avatar_url ? { avatar_url } : { username: name }}
            />
            <Modal
                get={isAuthenticated}
                set={setIsAuthenticated}>
                <form
                    className='w-full'
                    onSubmit={(e) => e.preventDefault()}>
                    <Login
                        title='Login to Vote.'
                        method='modal'
                    />
                </form>
            </Modal>
            <main className='w-full min-h-screen bg-clr-12 pt-5'>
                <section className='w-[90vw] max-w-[700px] flex flex-col gap-7 mx-auto'>
                    <article className='flex gap-4 items-center'>
                        <div className='grid place-items-center h-[5rem] w-[5rem] rounded-full overflow-hidden border-[2px] bg-clr-0 border-clr-5'>
                            {userData?.Profile?.avatar?.url ?
                                <Image
                                    alt='avatar'
                                    priority
                                    width={300}
                                    height={300}
                                    src={userData?.Profile?.avatar?.url}
                                    className='object-cover w-full h-full'
                                /> :
                                <div className={`${lato.className} text-clr-2 text-3xl font-bold`}>
                                    {userData?.username ? userData?.username[0].toUpperCase() : '0'}
                                </div>
                            }
                        </div>
                        <div className='flex flex-col gap-1.5 flex-wrap'>
                            <div className={`${questrial.className} flex gap-2 items-center text-clr-2 font-medium text-lg`}>
                                <Link
                                    href={`/${userData?.username}`}
                                    target='_blank'>
                                    @{userData?.username}
                                </Link>
                                {userData?.Account?.verified && <LuVerified />}
                            </div>
                            <p className={`${poppins.className} text-clr-13 text-sm`}>
                                {userData?.Profile?.bio}
                            </p>
                        </div>
                    </article>
                    <Poll poll={poll} />
                </section>
            </main>
        </>
    )
}

export default page