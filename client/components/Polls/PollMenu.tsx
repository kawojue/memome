"use client"
import { AxiosError } from 'axios'
import MenuItem from '../MenuItem'
import axios from '@/app/api/axios'
import Share from '../Modals/Share'
import PollExpiry from './PollExpiry'
import { usePoll } from '@/utils/store'
import {
    CiShare1, BiTimer, MdOutlineCancel,
    MdOutlinePrivacyTip, RiDeleteBin7Line,
} from '@/public/icons/ico'
import throwError from '@/utils/throwError'
import { Fragment, FC, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const PollMenu: FC<PollMenu> = ({ poll, polls, setPolls, isOwner }) => {
    const { setTotalPolls } = usePoll()
    const [visible, setVisible] = useState<boolean>(poll.private)
    const [activePoll, setActivePoll] = useState<boolean>(poll.active)
    const [sharePollModal, setSharePollModal] = useState<boolean>(false)
    const [pollExpiryModal, setPollExpiryModal] = useState<boolean>(false)

    const handleEdit = async (type: 'active' | 'visiblity', pollId: string): Promise<void> => {
        const originalValue = type === 'active' ? activePoll : visible
        const newValue = !originalValue

        switch (type) {
            case 'active':
                setActivePoll(newValue)
                break
            case 'visiblity':
                setVisible(newValue)
                break
            default:
                break
        }

        await axios.patch(
            `/api/poll/edit/toggle/${pollId}/${type}`
        ).catch((err: AxiosError) => {
            switch (type) {
                case 'active':
                    setActivePoll(originalValue)
                    break
                case 'visiblity':
                    setVisible(originalValue)
                    break
                default:
                    break
            }
            throwError(err)
        })
    }

    const handleDelete = async (pollId: string): Promise<void> => {
        const prevPolls = polls
        const prevTotalLength = polls.length
        const newPolls = polls.filter((poll) => poll.id !== pollId)

        setPolls(newPolls)
        setTotalPolls(newPolls.length)

        await axios.delete(
            `/api/poll/delete/${pollId}`
        ).catch((err: AxiosError) => {
            throwError(err)
            setPolls(prevPolls)
            setTotalPolls(prevTotalLength)
        })
    }

    return (
        <>
            <Share
                get={sharePollModal}
                set={setSharePollModal}
                data={{
                    share: `Vote here: https://memome.one/poll/${poll?.createdById
                        }/${poll?.id}`
                }}
                title='Share Poll'
            />
            <PollExpiry
                pollId={poll?.id!}
                pollExpiryModal={pollExpiryModal}
                setPollExpiryModal={setPollExpiryModal}
            />
            <div>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-clr-13 px-3 py-1.5 text-sm font-medium hover:bg-clr-5  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <ChevronDownIcon
                                className="h-4 w-4 text-clr-0 hover:text-clr-7"
                                aria-hidden='true'
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-clr-11 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <MenuItem
                                Icon={CiShare1}
                                content='Share'
                                handler={() => setSharePollModal(true)}
                            />
                            {isOwner && <>
                                <MenuItem
                                    Icon={MdOutlinePrivacyTip}
                                    content={`${visible === true ? 'Private' : 'Public'} Poll`}
                                    handler={async () => await handleEdit('visiblity', poll.id)}
                                />
                                <MenuItem
                                    Icon={MdOutlineCancel}
                                    handler={async () => await handleEdit('active', poll.id)}
                                    content={`${activePoll === true ? 'Active' : 'Suspended'} Poll`}
                                />
                                <MenuItem
                                    Icon={BiTimer}
                                    content='Set Expiry'
                                    handler={() => setPollExpiryModal(true)}
                                />
                                <MenuItem
                                    content='Delete'
                                    Icon={RiDeleteBin7Line}
                                    handler={async () => await handleDelete(poll.id)}
                                />
                            </>}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </>
    )
}

export default PollMenu