import {
    RiAccountCircleFill,
    FiLogOut, FiSettings,
} from '@/public/icons/ico'
import Link from 'next/link'
import Image from 'next/image'
import logout from '@/lib/logout'
import { useState, FC } from 'react'
import { poppins } from '@/public/fonts/f'
import { useRouter, usePathname } from 'next/navigation'

const NavBar: FC<NavProps> = ({
    isAuthenticated, data, pathName
}) => {
    const router = useRouter()
    const pathname = usePathname()
    const [open, setOpen] = useState<boolean>(false)

    const handleLogout = async () => {
        const res = await logout()
        if (res) router.push('/login')
    }

    return (
        <header>
            <nav className='nav-bar'>
                {isAuthenticated ?
                    <Link
                        href='/'
                        className={`object-cover overflow-hidden w-24 h-14`}>
                        <Image
                            src='https://d15zb4m4p46ai4.cloudfront.net/Dist/logo.png'
                            alt='logo' priority
                            width={150} height={150} />
                    </Link> :
                    <Link
                        href='/'
                        className='object-cover overflow-hidden w-24 h-14'>
                        <Image
                            src='https://d15zb4m4p46ai4.cloudfront.net/Dist/logo-2.png'
                            alt='logo' priority
                            width={300} height={300} />
                    </Link>
                }
                <div className='relative'>
                    {!isAuthenticated &&
                        <>
                            {pathName === 'signup' ?
                                <Link href='/login' className={`${poppins.className} nav-btn-link`}>
                                    Login
                                </Link> :
                                <Link href='/signup' className={`${poppins.className} nav-btn-link`}>
                                    Sign Up
                                </Link>
                            }
                        </>
                    }
                    {isAuthenticated &&
                        <>
                            <button
                                onClick={() => setOpen(!open)}
                                className='relative rounded-full overflow-hidden w-[50px] h-[50px] object-cover border-[0.125rem] border-clr-2 flex-shrink-0'>
                                {data?.avatar_url ?
                                    <Image
                                        priority
                                        width={300}
                                        height={300}
                                        alt='avatar'
                                        src={data.avatar_url}
                                    /> :
                                    <div className={`${poppins.className} font-bold text-lg text-clr-2`}>
                                        {data?.username ? data?.username[0].toUpperCase() : ''}
                                    </div>
                                }
                            </button>
                            <ul className={`${open && 'active'} font-medium nav-modal`}>
                                <li className={`${pathname === '/profile' && 'hidden'}`}>
                                    <Link href='/profile' className='flex items-center gap-3 trans hover:text-clr-3'>
                                        <RiAccountCircleFill />
                                        <span>Profile</span>
                                    </Link>
                                </li>
                                <li className={`${pathname === '/account' && 'hidden'}`}>
                                    <Link href='/account' className='flex items-center gap-3 trans hover:text-clr-3'>
                                        <RiAccountCircleFill />
                                        <span>Account</span>
                                    </Link>
                                </li>
                                <li className={`${pathname === '/settings' && 'hidden'}`}>
                                    <Link href='/settings' className='flex items-center gap-3 trans hover:text-clr-3'>
                                        <FiSettings />
                                        <span>Settings</span>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={async () => await handleLogout()}
                                        className='flex items-center gap-3 trans hover:text-clr-9'>
                                        <span>Logout</span>
                                        <FiLogOut />
                                    </button>
                                </li>
                            </ul>
                        </>
                    }
                </div>
            </nav>
        </header>
    )
}

export default NavBar