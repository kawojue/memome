import Modal from './Modal'
import axios from '@/app/api/axios'
import notify from '@/utils/notify'
import { FC, useState } from 'react'
import { LoaderThree } from '../Loader'
import { UserStore } from '@/utils/store'
import { useRouter } from 'next/navigation'
import throwError from '@/utils/throwError'
import { AxiosError, AxiosResponse } from 'axios'
import { BiInfoCircle } from '@/public/icons/ico'
import { poppins, prompt, questrial } from '@/public/fonts/f'

const DeleteAccount: FC<ModalComponent> = ({ get, set, title, data }) => {
    const router = useRouter()
    const { username, setUsername } = UserStore()
    const [deleting, setDeleting] = useState<boolean>(false)

    const deleteAccount = async (): Promise<void> => {
        setDeleting(true)
        await axios.post(
            `/auth/delete`,
            { username },
        ).then((res: AxiosResponse) => {
            set(false)
            notify('success', 'Account deletion was successful.')
            setTimeout(() => {
                router.push('/signup')
            }, 300)
        }).catch((err: AxiosError) => throwError(err))
            .finally(() => setDeleting(false))
    }

    return (
        <Modal
            get={get}
            set={set}>
            <header className={`${poppins.className} flex gap-3 items-center text-clr-18 text-lg md:text-base font-medium mt-3`}>
                <BiInfoCircle />
                <span>{title}</span>
            </header>
            <article className='mt-5 mb-9 flex flex-col gap-3 w-full px-2 py-3 rounded-lg bg-clr-14'>
                <label className={`${questrial.className}`}>
                    Enter your username
                    <span className={`${poppins.className} select-none font-semibold`}> {data?.username} </span>
                    to continue:
                </label>
                <input
                    type='text'
                    value={username}
                    autoComplete='off'
                    spellCheck='false'
                    autoCorrect='false'
                    autoCapitalize='false'
                    onChange={(e) => setUsername(e.target.value)}
                    className={`${prompt.className} rounded-md py-1.5 px-1 outline-none border-[2px] border-clr-5 tracking-wide focus:bg-clr-14`}
                />
            </article>
            <button
                className='save-btn-2 absolute bottom-2 right-3'
                disabled={username !== data?.username}
                onClick={async () => await deleteAccount()}>
                {deleting ? <LoaderThree /> : 'Delete'}
            </button>
        </Modal>
    )
}

export default DeleteAccount