/* eslint-disable @next/next/no-img-element */
"use client"
import Link from 'next/link'
import NavBar from '@/components/Nav'
import { poppins, questrial } from '@/public/fonts/f'

export default function Home() {
  return (
    <>
      <NavBar
        isAuthenticated={false}
      />
      <main className={`${poppins.className} mt-[100px] w-[95vw]`}>
        <section className='flex flex-col gap-4 items-center'>
          <img
            src={`https://i.gifer.com/4MvL.gif`}
            alt="gif"
          />
          <article>
            <Link
              target='_blank'
              className='font-medium underline'
              href={'https://twitter.com/HeyVickyJay'}>
              @VickyJay
            </Link>
            <span> is currently cooking this page.</span>
          </article>
          <article className='text-center'>
            <p className={`${questrial.className}`}>
              {`The old chef has no idea what this page is going to look like.`}
            </p>
            <Link
              target='_blank'
              className='font-medium underline'
              href={'https://twitter.com/@kawojue_'}>
              @kawojue
            </Link>
          </article>
          <p className='text-center'>
            {`Well, that won't stop us from using the entire app he dished.`}
          </p>
          <Link
            href={`/login`}
            className='save-btn-2'>
            Login
          </Link>
        </section>
      </main>
    </>
  )
}
