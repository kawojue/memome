import { FC } from 'react'
import Link from 'next/link'
import { LoaderThree } from './Loader'
import { UserStore } from '@/utils/store'
import { handleSignIn } from '@/lib/signin'
import { lato, poppins } from '@/public/fonts/f'
import { FcGoogle, AiOutlineGithub } from '@/public/icons/ico'

const AuthLayout: FC<AuthProps> = ({
    title,
    method,
    handler,
    children,
    pathName,
    btnLabel,
}) => {
    const { loading } = UserStore()

    return (
        <section className='w-full'>
            <h2 className={`${poppins.className} text-2xl tracking-wider font-medium mb-7 md:text-3xl text-clr-4`}>
                {title}
            </h2>
            <article>
                {children}
                <div className='flex justify-end mt-3'>
                    <button
                        className='submit-btn'
                        onClick={async () => await handler()}>
                        {loading ? <LoaderThree /> :
                            <>
                                {btnLabel || 'Submit'}
                            </>
                        }
                    </button>
                </div>
            </article>
            {(pathName === 'signup' || pathName === 'login') &&
                <>
                    <div className="flex items-center justify-center gap-3">
                        <span className="border-[1.5px] border-clr-x w-full rounded-md" />
                        <span className="font-medium tracking-wide">Or</span>
                        <span className="border-[1.5px] border-clr-x w-full rounded-md" />
                    </div>
                    <div className={`${lato.className} flex flex-col gap-4 my-3`}>
                        {/* If Google verifies me - I will uncomment it. */}
                        <button
                            className='provider-btn'
                            onClick={() => handleSignIn('google', method!)}>
                            <FcGoogle className="text-2xl" />
                            <span>Google</span>
                        </button>
                        <button
                            className='provider-btn'
                            onClick={() => handleSignIn('github', method!)}>
                            <AiOutlineGithub className="text-2xl" />
                            <span>Github</span>
                        </button>
                    </div>
                </>
            }
            <div className="flex justify-end mt-2 text-[15px]">
                <p>
                    {pathName === 'signup' ?
                        <>
                            <span className="mr-2 text-clr-4">
                                Already have an account?
                            </span>
                            <Link
                                href='/login'
                                className="text-clr-1 hover:text-clr-8 trans font-medium">
                                Login
                            </Link>
                        </> :
                        <>
                            <span className="mr-2 text-clr-4">
                                {`Don't have an account?`}
                            </span>
                            <Link
                                href='/signup'
                                className="text-clr-1 hover:text-clr-8 trans font-medium">
                                Sign Up
                            </Link>
                        </>
                    }
                </p>
            </div>
        </section>
    )
}

export default AuthLayout