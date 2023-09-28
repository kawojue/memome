/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import NavBar from '@/components/Nav'
import Login from '@/components/Login'

const page = () => {
    return (
        <>
            <NavBar
                pathName='login'
                isAuthenticated={false}
            />
            <form
                onSubmit={(e) => e.preventDefault()}
                className='card w-[92vw] max-w-[500px] mx-auto mt-3 mb-10 px-5 py-7'>
                <Login
                    title='Login'
                    method='home'
                />
            </form>
        </>
    )
}

export default page