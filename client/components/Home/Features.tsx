import Image from 'next/image'
import { features } from '@/data/data'
import { monst } from '@/public/fonts/f'
import { H1, H3, P } from '@/components/Typography'

export default function Features() {
    return (
        <section
            id='features'
            className={`${monst.className} bg-[#FAFAFA] pt-[62px]`}>
            <div className='flex flex-col items-center mx-auto '>
                <H1 className='md:!text-[40px] !text-[25px] font-semibold '>
                    Features{' '}
                </H1>
                <P className='text-base md:text-[20x] font-normal text-[#6E6E6E]'>
                    This are the ultimate features in memome
                </P>
            </div>
            <div className='flex flex-row flex-wrap justify-center mx-[77px] items-center gap-5 md:mt-[85px]'>
                {features.map((feature) => (
                    <div
                        key={feature?.id}
                        className='group transition-all duration-300 hover:scale-[.96] bg-white rounded-[10px] max-w-[368.73px] h-[317p] mt-[37.71px] px-[30px] pt-[35.41px] pb-[35.96px] md:h-[377px] w-full md:max-w-[440px] md:pt-[45px] md:px-[36px] md:pb-[43px] hover:bg-memo/10'>
                        <figure>
                            <Image
                                src={feature?.logo}
                                alt={feature?.title}
                                priority
                                width={100}
                                height={100}
                                draggable={false}
                                className='object-cover w-[41.9px] h-[41.9px] md:w-[50px] md:h-[50px]'
                            />
                            <H3 className='!text-[16.76px] mt-[20.95px] md:!text-[20px] md:mt-[25px]'>
                                {feature?.title}
                            </H3>
                            <P className={`md:mt-[19px] ${feature?.styles} text-[#6E6E6E] leading-[23px] max-w-[375px]`}>
                                {feature?.content}
                            </P>
                        </figure>
                    </div>
                ))}
            </div>
        </section>
    )
}
