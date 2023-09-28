/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Message from './Message'
import { AxiosResponse } from 'axios'
import useToken from '@/hooks/useToken'
import { LoaderThree } from '../Loader'
import MessageMenu from './MessageMenu'
import { axiosReq } from '@/app/api/axios'
import { FC, useEffect, useState } from 'react'
import { useMessageStore } from '@/utils/store'
import { poppins, prompt } from '@/public/fonts/f'

const Messages: FC<TabProps> = ({ username }) => {
    const limit = 10 as const
    const token = useToken()
    const {
        fetching, setTotalMessages,
        setFetching, totalMessages,
    } = useMessageStore()
    const [page, setPage] = useState<number>(1)
    const [messages, setMessages] = useState<MessageStates[]>([])
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const fetchMessages = async (): Promise<void> => {
        if (fetching) {
            return
        }
        setFetching(true)
        await axiosReq.get(
            `/api/msg/${username}?limit=${limit}&page=${page}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then((res: AxiosResponse) => {
            setTotalMessages(res.data?.length)
            setIsAuthenticated(res.data?.isAuthenticated)
            setMessages((prevMessages) => [...prevMessages, ...res.data?.messages])
        }).finally(() => setFetching(false))
    }

    useEffect(() => {
        if (token && username) {
            fetchMessages()
        } else {
            if (token === '' && username) {
                fetchMessages()
            }
        }
    }, [token, page, username])

    return (
        <section className='mb-[30px]'>
            <header className="text-left">
                <h3 className={`${poppins.className} font-medium text-sm tracking-wide mb-3`}>
                    {totalMessages} Messages
                </h3>
            </header>
            <article className="w-full gap-7 place-items-center grid grid-cols-1 md:grid-cols-2">
                {messages.map((message) => (
                    <section
                        key={message.id}
                        className='flex gap-2'>
                        <Message message={message} />
                        {isAuthenticated && <MessageMenu
                            message={message}
                            messages={messages}
                            setMessages={setMessages}
                        />}
                    </section>
                ))}
            </article>
            <div className='w-full flex justify-center items-center'>
                {fetching ?
                    <LoaderThree /> :
                    <button
                        className={`${messages.length <= totalMessages && 'hidden'} ${prompt.className} mt-3 px-3 py-1.5 text-lg tracking-wider bg-clr-13 text-clr-0 w-fit rounded-full`}
                        onClick={() => setPage((prev) => prev + 1)}>
                        Load more
                    </button>}
            </div>
        </section>
    )
}

export default Messages