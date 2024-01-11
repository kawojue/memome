'use client'
import Link from 'next/link'
import Image from 'next/image'
import { monst } from '@/public/fonts/f'
import { LargeLinks } from './LargeLinks'
import { ToggleButton } from './ToggleBtn'
import { Search } from '@/public/svgs/svg'
import { MobileDrawer } from './MobileDrawer'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const [search, setSearch] = useState('')
  const [opened, setOpened] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLDivElement | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  useEffect(() => {
    function handleClicks(e: MouseEvent): void {
      if (headerRef.current?.contains(e.target as Node)) {
        return
      }
      setOpened(false)
    }
    window.addEventListener('click', handleClicks)
    return () => {
      window.removeEventListener('click', handleClicks)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <header
      ref={headerRef}
      className={`${monst.className} w-full px-[33px] py-[21px] lg:py-[39px] lg:px-[71px] text-black border-b border-white/20`}>
      <nav className={`  ${scrolled ? 'bg-memo/10 p-2' : ''
        } container flex items-center justify-between px-3 mx-auto`} >
        <div className={` flex flex-row items-center lg:gap-20`}>
          <Link href='/' onClick={() => setOpened(false)}>
            {/* <b className='text-xl font-black md:text-2xl'>
              <span>Memo</span>
              <span className='text-[#FF9400]-1'>Me</span>
            </b> */}
            <Image
              src='https://d15zb4m4p46ai4.cloudfront.net/Dist/logo.png'
              alt='logo'
              width={100}
              height={100}
              priority
              draggable={false}
              className='w-[100px] block  md:w-[168px] '
            />
          </Link>
          <LargeLinks />
        </div>
        <ToggleButton setOpened={setOpened} opened={opened} />
        <div className='hidden md:flex flex-row gap-5 items-center'>
          {/* <form className='relative'>
            <figure className='absolute top-5 ml-r left-3 active:scale-95'>
              <Search />
            </figure>
            <input
              type='search'
              name='search'
              id='search'
              placeholder='search'
              onChange={handleChange}
              value={search}
              className='outline-none w-[230px] lg:w-[373px] rounded-[5px] border-solid border-[1.5px] border-[#ddd] pl-12 px-[30px] py-[18px] text-[#A9A9A9] text-base font-semibold'
            />
          </form> */}
          <Link href='/login'>
            <div className='bg-[#FF9400] rounded-md md:px-6 md:py-4 lg:px-[60px] lg:py-4 text-white text-base font-semibold transition-all duration-300 active:scale-90 hover:scale-105'>
              Login
            </div>
          </Link>
        </div>
      </nav>
      <MobileDrawer opened={opened} setOpened={setOpened} />
    </header>
  )
}
