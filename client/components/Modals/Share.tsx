import Modal from './Modal'
import Link from 'next/link'
import { FC, useState } from 'react'
import {
    AiOutlineTwitter, AiOutlineWhatsApp, AiFillCopy
} from '@/public/icons/ico'
import { poppins, prompt } from '@/public/fonts/f'
import { copyToClipboard } from '@/utils/copyToClipboard'

const Share: FC<ModalComponent> = ({ get, set, data, title }) => {
    const [copy, setCopy] = useState('Copy to clipboard')

    return (
        <Modal get={get} set={set}>
            {title && <h3 className={`${poppins.className} text-clr-13 text-lg md:text-base font-medium mt-3`}>
                {title}
            </h3>}
            <ul className='flex flex-col gap-4 mt-6'>
                <li
                    className={`${prompt.className} social-list`}
                    onClick={async () => await copyToClipboard(data?.share, setCopy)}>
                    <p>
                        <span>{copy}</span>
                        <AiFillCopy />
                    </p>
                </li>
                <li className={`${prompt.className} social-list`}>
                    <Link target="_blank"
                        href={`https://twitter.com/intent/tweet?text=${data?.share}`}>
                        <p>Twitter</p>
                        <AiOutlineTwitter />
                    </Link>
                </li>
                <li className={`${prompt.className} social-list`}>
                    <Link target="_blank"
                        href={`https://api.whatsapp.com/send?text=${data?.share}`}>
                        <p>WhatsApp</p>
                        <AiOutlineWhatsApp />
                    </Link>
                </li>
            </ul>
        </Modal>
    )
}

export default Share