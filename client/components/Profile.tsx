"use client"
import Link from 'next/link'
import Levels from './Levels'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Share from './Modals/Share'
import Avatar from './Modals/Avatar'
import {
    FaPollH, AiOutlinePlus, LuVerified,
    BiSolidMessageDetail, AiOutlineCamera,
} from '@/public/icons/ico'
import CreatePoll from './Polls/CreatePoll'
import { useModalStore } from '@/utils/store'
import { FC, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { formatNumber } from '@/utils/formatNumber'
import { poppins, questrial } from '@/public/fonts/f'

const PollTab = dynamic(() => import('@/components/Polls/Polls'))
const MessageTab = dynamic(() => import('@/components/Messages/Messages'))

const Profile: FC<IProfile> = ({ user, pathName, username }) => {
    const activeTab = useSearchParams().get('tab') || 'messages'
    const {
        avatarModal, setAvatarModal,
        shareLinkModal, setShareLinkModal,
        createPollModal, setCreatePollModal,
    } = useModalStore()

    const [onMouse, setOnMouse] = useState<boolean>(false)
    const [plusClicked, setPlusClicked] = useState<boolean>(false)

    useEffect(() => {
        if (pathName === 'main') {
            document.title = 'Profile | MemoMe'
        } else {
            document.title = `Profile | ${username}`
        }
    }, [activeTab, pathName, username])

    return (
        <main className='profile'>
            {/* Modals */}
            <Avatar
                get={avatarModal}
                set={setAvatarModal}
                data={{
                    username: user?.username,
                    avatar: user?.Profile?.avatar,
                }}
            />
            <Share
                get={shareLinkModal}
                set={setShareLinkModal}
                data={{
                    share: `Please, send me anonymous messages on https://memome.one/anon/${user?.username}`,
                }}
                title='Share the link with your Comrades.'
            />
            <CreatePoll
                get={createPollModal}
                set={setCreatePollModal}
            />
            {pathName === 'main' &&
                <>
                    <button
                        className='fixed z-[999] bottom-14 right-9 p-2 bg-clr-1 cursor-pointer rounded-full text-xl lg:text-3xl md:text-2xl'
                        style={{
                            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                            animation: 'bounce 2s ease-in-out infinite'
                        }}
                        onClick={() => setPlusClicked((prev) => !prev)}>
                        <AiOutlinePlus className={`plus-icon ${plusClicked && 'active'} w-full`} />
                    </button>
                    <div className={`${plusClicked ? 'show-action' : ''} action`}>
                        <button
                            onClick={() => {
                                setShareLinkModal(true)
                                setPlusClicked((prev) => !prev)
                            }}
                            className={`${poppins.className} flex gap-3 items-center tracking-wide text-clr-2 hover:text-clr-9 trans w-full`}>
                            <span >
                                Anonymous Link
                            </span>
                            <BiSolidMessageDetail className='text-lg lg:text-2xl md:text-xl' />
                        </button>
                        <button
                            onClick={() => {
                                setCreatePollModal(true)
                                setPlusClicked((prev) => !prev)
                            }}
                            className={`${poppins.className} flex gap-3 items-center tracking-wide text-clr-2 hover:text-clr-9 trans w-full`}>
                            <span>
                                Host a Poll
                            </span>
                            <FaPollH className='text-lg lg:text-2xl md:text-xl' />
                        </button>
                    </div>
                </>}
            <article className="profile-header">
                <h1 className='text-2xl text-clr-13 font-semibold tracking-wide md:text-3xl'>
                    {pathName === 'main' ? "Profile" : "User Profile"}
                </h1>
            </article>
            <section className="profile-cards">
                <article className="profile-card">
                    <div className="profile-card-center">
                        <>
                            {pathName !== 'main' ?
                                <>
                                    {user?.Profile?.avatar?.url ?
                                        <div
                                            className={`profile-avatar`}>
                                            <Image
                                                priority
                                                alt='avatar'
                                                width={300}
                                                height={300}
                                                src={user?.Profile?.avatar?.url}
                                            />
                                        </div> :
                                        <div className='profile-not-avatar'>
                                            <div className={`${poppins.className} font-bold text-5xl text-clr-2`}>
                                                {user?.username ? user?.username[0].toUpperCase() : '0'}
                                            </div>
                                        </div>
                                    }
                                </> :
                                <>
                                    {user?.Profile?.avatar?.url ?
                                        <div
                                            onClick={() => setAvatarModal(!avatarModal)}
                                            onMouseLeave={() => setOnMouse(false)}
                                            onMouseEnter={() => setOnMouse(true)}
                                            className={`${onMouse && 'hovered'} profile-avatar`}>
                                            <Image
                                                priority
                                                alt='avatar'
                                                width={300}
                                                height={300}
                                                src={user?.Profile?.avatar?.url}
                                            />
                                            <div className={`${onMouse && 'cam-ico'}`}>
                                                <AiOutlineCamera
                                                    className="text-clr-0 text-4xl md:text-5xl lg:text-6xl"
                                                />
                                            </div>
                                        </div> :
                                        <div
                                            onClick={() => setAvatarModal(!avatarModal)}
                                            onMouseLeave={() => setOnMouse(false)}
                                            onMouseEnter={() => setOnMouse(true)}
                                            className={`${onMouse && 'hovered'} relative profile-not-avatar`}>
                                            <div className={`${poppins.className} font-bold text-5xl text-clr-2`}>
                                                {user?.username ? user?.username[0].toUpperCase() : '0'}
                                            </div>
                                            <div className={`hidden ${onMouse && 'cam-ico'}`}>
                                                <AiOutlineCamera
                                                    className="text-clr-0 text-4xl md:text-5xl lg:text-6xl"
                                                />
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                        </>
                        <div className='flex flex-col gap-2'>
                            <p className='flex gap-3 items-center font-semibold cursor-pointer text-clr-2 text-xl md:text-2xl lg:text-3xl tracking-wide'>
                                <Link
                                    href={`/anon/${user?.username}`}
                                    target='_blank'>
                                    @{user?.username}
                                </Link>
                                {user?.Account?.verified && <LuVerified />}
                            </p>
                            {user?.Profile?.bio &&
                                <p className={`${poppins.className} md:text-sm text-xs text-clr-13`}>
                                    {user?.Profile?.bio}
                                </p>
                            }
                        </div>
                    </div>
                </article>
                <article className='profile-card'>
                    <div>
                        <span
                            className={`${questrial.className} px-2.5 py-1.5 rounded-full text-clr-11 font-semibold tracking-wider`}
                            style={{
                                background: `linear-gradient(138deg, rgba(60,49,49,1) 75%, rgba(251,164,45,1) 100%)`
                            }}>
                            Profile Views: {formatNumber(user?.Profile?.views)}
                        </span>
                        {
                            pathName === 'main' ?
                                <Levels
                                    msgPoint={user?.Profile?.msg_point}
                                    pollPoint={user?.Profile?.poll_point}
                                /> : user?.Settings?.show_levels && <Levels
                                    msgPoint={user?.Profile?.msg_point}
                                    pollPoint={user?.Profile?.poll_point}
                                />
                        }
                    </div>
                </article>
                <article className='flex gap-9 mt-5'>
                    <Link
                        href={`/${pathName === 'main' ? 'profile': username}?tab=messages`}
                        className={`${questrial.className} tab ${activeTab === 'messages' && 'active'}`}>
                        Messages
                    </Link>
                    <Link
                        href={`/${pathName === 'main' ? 'profile': username}?tab=polls`}
                        className={`${questrial.className} tab ${activeTab === 'polls' && 'active'}`}>
                        Polls
                    </Link>
                </article>
                {activeTab === 'polls' && <PollTab username={user?.username} />}
                {activeTab === 'messages' && <MessageTab username={user?.username} />}
            </section>
        </main>
    )
}

export default Profile