"use client"
import axios from '@/app/api/axios'
import { FC, useState } from 'react'
import { usePoll } from '@/utils/store'
import { prompt } from '@/public/fonts/f'
import throwError from '@/utils/throwError'
import {
    GiCheckMark, AiOutlineLoading3Quarters
} from '@/public/icons/ico'
import { AxiosError, AxiosResponse } from 'axios'

const Option: FC<PollOptionProps> = ({
    optionPercentage, expired,
    poll, notValidToVote, option
}) => {
    const { setPoll, setIsAuthenticated } = usePoll()
    const [voteLoad, setVoteLoad] = useState<boolean>(false)

    const vote = async (optionId: string) => {
        setVoteLoad(true)
        await axios.post(
            `/api/poll/vote/${poll?.createdById}/${poll?.id}/${optionId}`
        ).then((res: AxiosResponse) => setPoll(res.data?.poll))
            .catch((err: AxiosError) => {
                const statusCodes: unknown = err.response?.status
                if (statusCodes === 403) {
                    setIsAuthenticated(true)
                } else {
                    throwError(err)
                }
            }).finally(() => setVoteLoad(false))
    }

    return (
        <button
            onClick={async () => vote(option?.id)}
            className={`${prompt.className} ${notValidToVote ? 'rounded-md' : 'rounded-full'} relative h-[30px] flex items-center overflow-hidden bg-clr-1 w-full text-clr-0 disabled:bg-clr-9`}
            style={{
                boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px`
            }}
            disabled={Boolean(poll?.active === false || expired() || poll?.hasVoted)}>
            {notValidToVote &&
                <div
                    className={`transition-all ease-in-out duration-500 absolute bg-clr-3 h-full ${notValidToVote ? 'rounded-md' : 'rounded-full'}`}
                    style={{
                        width: `${optionPercentage}%`,
                        boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`
                    }} />}
            <>
                {voteLoad ?
                    <div className='w-full px-2 py-1 flex justify-between relative text-sm'>
                        <span>
                            {option.texts}
                        </span>
                        <AiOutlineLoading3Quarters className='vote-load font-bold text-lg' />
                    </div> :
                    <div className='w-full px-2 py-1 flex justify-between items-center relative text-sm'>
                        <span>
                            {option.texts}
                        </span>
                        {(poll?.hasVoted && poll?.votedOption === option.id) && <GiCheckMark />}
                        {notValidToVote &&
                            <span>
                                {option.totalVotes} &#8226; {optionPercentage.toFixed(1)}%
                            </span>}
                    </div>}
            </>
        </button>
    )
}

export default Option