"use client"
import MyPage from '@/components/MyPage'
import Profile from '@/components/Profile'

const page = () => {
    return (
        <MyPage param='profile'>
            {({ data }) => (
                <Profile
                    user={data}
                    pathName='main'
                />
            )}
        </MyPage>
    )
}

export default page