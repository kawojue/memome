"use client"
import notify from '@/utils/notify'
import axios from '@/app/api/axios'
import Modal from '../Modals/Modal'
import { LoaderThree } from '../Loader'
import { usePoll } from '@/utils/store'
import throwError from '@/utils/throwError'
import { FC, useEffect, useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { poppins, questrial } from '@/public/fonts/f'

const PollExpiry: FC<PollExpiryProps> = ({
    pollId, pollExpiryModal, setPollExpiryModal
}) => {
    const { expiry, setExpiry } = usePoll()
    const [load, setLoad] = useState<boolean>(false)
    const [defaultExpiry, setDefaultExpiry] = useState<string>()

    useEffect(() => {
        const currentDate = new Date()
        currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset())

        setDefaultExpiry(currentDate.toISOString().slice(0, 16))
    }, [])

    const handleExpiry = async (): Promise<void> => {
        if (!expiry) {
            notify('error', 'Invalid Date.')
            return
        }

        const getDate = new Date(expiry)
        if (getDate < new Date()) {
            notify('error', 'Invalid Expiry Date.')
            return
        }

        setLoad(true)

        await axios.post(
            `/api/poll/edit/expiry/${pollId}`,
            { date: getDate.toISOString() }
        ).then((res: AxiosResponse) => {
            setPollExpiryModal(false)
            notify('success', 'Expiry date successfully set.')
        }).catch((err: AxiosError) => throwError(err))
            .finally(() => setLoad(false))
    }

    return (
        <Modal
            get={pollExpiryModal}
            set={setPollExpiryModal}>
            <h3 className={`${poppins.className} text-clr-13 text-base font-medium`}>
                Set Poll Expiry Date
            </h3>
            <article className='w-full my-3 flex justify-center items-center'>
                <input
                    type='datetime-local'
                    value={expiry || defaultExpiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className={`${questrial.className} tracking-wider font-medium outline-none px-1 py-0.5 rounded-md text-clr-16 bg-clr-0 md:text-base text-sm`}
                />
            </article>
            <button
                onClick={async () => handleExpiry()}
                className='save-btn-2 absolute right-4 bottom-2'>
                {load ? <LoaderThree /> : 'Save'}
            </button>
        </Modal>
    )
}

export default PollExpiry