import MenuItem from '../MenuItem'
import axios from '@/app/api/axios'
import throwError from '@/utils/throwError'
import { Fragment, FC, useState } from 'react'
import { useMessageStore } from '@/utils/store'
import { AxiosError, AxiosResponse } from 'axios'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { MdOutlinePrivacyTip, RiDeleteBin7Line } from '@/public/icons/ico'

const MessageMenu: FC<MessageMenu> = ({ message, messages, setMessages }) => {
    const { setTotalMessages } = useMessageStore()
    const [visible, setVisible] = useState<boolean>(message.private)

    const handleVisibility = async (msgId: string) => {
        setVisible((prev) => !prev)
        await axios.get(
            `/api/msg/edit/${msgId}`
        ).catch((err: AxiosError) => {
            setVisible((prev) => !prev)
            throwError(err)
        })
    }

    const handleDelete = async (msgId: string) => {
        await axios.delete(`/api/msg/delete/${msgId}`)
            .then((res: AxiosResponse) => {
                const filteredMessages = messages.filter((msg) => msg.id !== msgId)
                setMessages(filteredMessages)
                setTotalMessages(filteredMessages.length)
            }).catch((err: AxiosError) => throwError(err))
    }

    return (
        <div >
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
                            Icon={MdOutlinePrivacyTip}
                            handler={async () => await handleVisibility(message.id)}
                            content={`${visible === true ? 'Private' : 'Public'} Message`}
                        />
                        <MenuItem
                            content={`Delete`}
                            Icon={RiDeleteBin7Line}
                            handler={async () => await handleDelete(message.id)}
                        />
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default MessageMenu