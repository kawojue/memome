/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link'
import { faqs } from '@/data/data'
import { monst } from '@/public/fonts/f'
import Button from '@/components/Button'
import { Play } from '@/public/svgs/svg'
import Footer from '@/components/Footer'
import Navbar from '@/components/NavBar/Navbar'
import { Hero, Faqs, Features, Summary } from '@/components/Home/'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={`${monst.className} mx-auto mt-[42px] md:mt-[100px] w-[100vw]`}>
        <section>
          {/* hero */}
          <div className='flex flex-col gap-[21px] items-center mx-auto text-center'>
            <h3
              className={`text-black font-bold max-w-[373px] text-[25px] text-center md:max-w-xl  mx-auto md:text-[40px] lg:max-w-[1250px]`}>
              Ultimate Anonymous Platform for Secure Communication, Polls,
              and Content Control
            </h3>
            <p className='lg:text-[20px] max-w-[367px] text-base lg:max-w-[773px] text-center mx-auto lg:text-[#A9A9A9] font-normal  '>
              The ultimate anonymous platform for secure communication, hosting
              polls, and sharing without fear of judgment.
            </p>
            <div className='flex flex-row gap-[10px] md:gap-4 items-center'>
              <Link href='/signup'>
                <Button className='border-memo border-[2px]' type='button'>
                  Get Started
                </Button>
              </Link>
              <div className='flex items-center gap-1'>
                <div className='w-[42px] h-[42px] relative'>
                  <div className='w-[40px] h-[40px] rounded-[50%] circular-box-shadow grid place-items-center'>
                    <Play />
                  </div>
                  <img
                    src='https://res.cloudinary.com/dkoe20rzl/image/upload/v1696959526/u794klbg2goqnlfkhanm.svg'
                    alt='Ellipse Half'
                    draggable={false}
                    className='w-[40px] h-[40px] absolute left-[-8px] top-[-2px]'
                  />
                </div>
                <h1 className="font-bold text-black text-[7.189px] max-w-[44px] lg:max-w-[74px] lg:text-[12px] lg:leading-[14px] w-[74px] relative after:content-[''] after:absolute after:w-[5px] after:h-[5px] after:bg-[#18A0FB] after:rounded-[50%] after:right-[-10px] after:bottom-[4px]">
                  Watch Our Short film
                </h1>
              </div>
            </div>
          </div>
        </section>
        <Hero />
        <Features />
        <Summary />
        <Faqs faqs={faqs} />
      </main>
      <Footer />
    </>
  )
}
