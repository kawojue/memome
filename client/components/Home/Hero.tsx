import Image from 'next/image'

export default function Hero() {
    return (
        <section>
            <div className='relative flex flex-col items-center'>
                <figure className='absolute bottom-0'>
                    <Image
                        src='https://d15zb4m4p46ai4.cloudfront.net/Dist/wave.png'
                        fetchPriority='high'
                        priority
                        width={100}
                        height={100}
                        draggable={false}
                        alt='wave illustration'
                        className='w-full z-40 object-cover block'
                    />
                </figure>
                <figure className='relative z-20 group bg-hero mt-[40px] px-[41px] py-[42px] rounded-[20px] outline-red-50 outline w-fit mx-auto'>
                    <Image
                        src='https://d15zb4m4p46ai4.cloudfront.net/Dist/hero.png'
                        fetchPriority='high'
                        priority
                        width={100}
                        height={100}
                        draggable={false}
                        alt='hero_img'
                        className='mx-auto object-cover block transition-all duration-300 group-hover:scale-[.96] md:w-full w-3/4'
                    />
                </figure>
            </div>
        </section>
    )
}
