"use client"
import { FC } from 'react'
import Option from './Option'
import { questrial } from '@/public/fonts/f'
import { formatNumber } from '@/utils/formatNumber'

const Options: FC<{ poll: MyPoll | undefined }> = ({ poll }) => {
    const expired = () => {
        const now = new Date().getTime()

        if (poll && poll.expiry) {
            const expiryTimestamp = Date.parse(poll.expiry)

            if (!isNaN(expiryTimestamp) && now > expiryTimestamp) {
                return true
            }
        }

        return false
    }

    const notValidToVote = (poll?.hasVoted || expired() || poll?.active === false)

    return (
        <section className='mb-3'>
            <div className='w-full my-3.5 flex flex-col gap-3'>
                {poll?.options?.map((option) => {
                    const optionPercentage = (option.totalVotes / poll.totalVotes) * 100
                    return (
                        <article
                            key={option.id}
                            className='w-full'>
                            <Option
                                poll={poll}
                                option={option}
                                expired={expired}
                                notValidToVote={notValidToVote}
                                optionPercentage={optionPercentage}
                            />
                        </article>
                    )
                })}
            </div>
            <div className={`${questrial.className} flex items-center justify-between text-sm text-clr-4 font-medium tracking-wide px-1.5 md:px-3.5`}>
                <span>View(s) &#8226; {formatNumber(poll?.views!)}</span>
                {(poll?.active === false || expired()) &&
                    <span className='text-xs'>Final Results</span>}
                <span>Vote(s) &#8226; {poll?.totalVotes}</span>
            </div>
        </section>
    )
}

export default Options