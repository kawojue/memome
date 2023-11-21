import Link from 'next/link'
import NavLink from '@/components/NavLink'
import { Search } from '@/public/svgs/svg'
import routes from '../../data/routes.json'
import { ChangeEvent, useState } from 'react'

export function MobileDrawer({ opened, setOpened }: ToggleProps) {
  const [search, setSearch] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  return (
    <div className={`transition-all duration-300 w-full -z-10 md:hidden grid overflow-hidden ${opened ? 'grid-rows-[1fr] p-3' : 'grid-rows-[0fr]'
      }`}>
      <div className='min-h-0 transition-all duration-300'>
        <ul className='space-y-2'>
          {routes.map((route, index) => (
            <li key={index}>
              <NavLink href={route.route}>
                {({ isActive }) => (
                  <div
                    onClick={() => setOpened(false)}
                    className='flex items-center gap-1.5 group'
                  >
                    <div
                      className={`bg-[#FF9400]/70 w-1 rounded-full transition-all duration-300  ${isActive ? 'h-6' : 'group-hover:h-6 h-1'
                        }`}
                    />
                    <div className={`font-semibold rounded-md p-2 transition-all duration-300 w-full max-w-md ${isActive ? 'bg-[#FF9400]' : 'hover:bg-[#FF9400]/70'
                      }`}>
                      {route.name}
                    </div>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
          <form className='relative'>
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
              className='outline-none w-[373px] rounded-[5px] border-solid border-[1.5px] border-[#ddd] pl-12 px-[30px] py-[18px] text-[#A9A9A9] text-base font-semibold'
            />
          </form>
        </ul>
        <Link
          href='/auth/login'
          onClick={() => setOpened(false)}
          className={`w-full rounded-md bg-[#FF9400] text-white font-bae flex justify-center items-center py-2 active:scale-95 transition-all duration-300 mt-3`}>
          Login
        </Link>
      </div>
    </div>
  )
}
