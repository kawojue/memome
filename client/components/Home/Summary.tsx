import Image from 'next/image'
import { monst } from '@/public/fonts/f'
import { H3, P } from '@/components/Typography'

export default function Summary() {
    return (
        <section className={`${monst.className} pt-[30px] px-[38px] md:px-[72px] md:pt-[104px] bg-[#FAFAFA]`}>
            <div className='flex flex-col-reverse gap-[34px] md:flex md:flex-row md:gap-[46px] items-center justify-center'>
                <figure>
                    <Image
                        src={`https://d15zb4m4p46ai4.cloudfront.net/Dist/summary.png`}
                        alt='summary_illustation'
                        draggable={false}
                        height={100}
                        width={100}
                        priority
                        className='object-cover mx-auto w-3/4 lg:w-full'
                    />
                </figure>
                <div className='flex flex-col gap-[11.5px] md:gap-4'>
                    <H3 className='text-[20px] md:!:text-[30px] leading-[44px] font-semibold'>
                        summary
                    </H3>

                    <P className='text-[#000000] text-[18px] max-w-[357px] md:!text-[20px] leading-[30px] lg:leading-[44px] md:max-w-[541px]'>
                        MemoMe offers a user-friendly interface combined with robust
                        features. Whether you're here to host polls, utilize our message
                        generator, or explore the array of communication options, MemoMe is
                        your ideal choice.
                    </P>
                </div>
            </div>
        </section>
    )
}
