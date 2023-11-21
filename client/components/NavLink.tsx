import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

function NavLink({ href, children }: NavLinkProps) {
    const [isActive, setIsActive] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        pathname.includes(href) ? setIsActive(true) : setIsActive(false)
    }, [href, pathname])

    return <Link href={href}>{children({ isActive })}</Link>
}

export default NavLink
