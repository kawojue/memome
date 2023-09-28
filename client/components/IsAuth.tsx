"use client"
import axios from '@/app/api/axios'
import { ReactNode, useEffect } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { usePathname, useRouter } from 'next/navigation'

export default function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const isAuth = async (): Promise<void> => {
            await axios.get('/auth/isAuth')
                .then((res: AxiosResponse) => {
                    if (
                        (
                            (pathname === '/') || (pathname === '/login') || (pathname || '/signup')
                            || (pathname === '/password/verify') || (pathname === '/password/reset')
                        )
                        && (
                            (pathname !== '/profile') &&
                            (pathname !== '/account') &&
                            (pathname !== '/settings')
                        )
                    ) {
                        router.push('/profile')
                    }
                }).catch((err: AxiosError) => {
                    const statusCodes: unknown = err.response?.status
                    if (statusCodes === 403) {
                        if (
                            (pathname === '/profile') ||
                            (pathname === '/account') ||
                            (pathname === '/settings')
                        ) {
                            router.push('/login')
                        }
                    }
                })
        }

        isAuth()
    }, [pathname, router])

    return (
        <>
            {children}
        </>
    )
}
