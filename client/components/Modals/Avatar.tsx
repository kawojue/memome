/* eslint-disable @next/next/no-img-element */
import Modal from './Modal'
import Image from 'next/image'
import blob from '@/utils/file'
import axios from '@/app/api/axios'
import notify from '@/utils/notify'
import { LoaderThree } from '../Loader'
import MaxSize from '@/enums/fileMaxSizes'
import throwError from '@/utils/throwError'
import { ChangeEvent, FC, useState } from 'react'
import { AxiosResponse, AxiosError } from 'axios'
import { poppins, questrial } from '@/public/fonts/f'
import { UserStore, useModalStore } from '@/utils/store'
import { AiOutlineCloudUpload, RiDeleteBin6Line } from '@/public/icons/ico'

const Avatar: FC<ModalComponent> = ({ get, set, data }) => {
    const { avatar, setAvatar } = UserStore()
    const { loading, setLoading } = useModalStore()
    const [avatarPreview, setAvatarPreview] = useState<string>('')

    const changeAvatar = async (): Promise<void> => {
        setLoading(true)

        const formData = new FormData()
        if (avatar) {
            formData.append('avatar', avatar, avatar.name)
        }

        await axios.post(
            '/auth/api/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/formdata'
            }
        }).then((res: AxiosResponse) => {
            set(false)
            notify('success', res.data?.msg)
            setTimeout(() => {
                window.location.reload()
            }, 450)
        }).catch((err: AxiosError) => throwError(err))
            .finally(() => setLoading(false))


    }

    const delAvatar = async (): Promise<void> => {
        await axios.delete('/auth/api/avatar')
            .then((res: AxiosResponse) => {
                set(false)
                notify('success', res.data?.msg)
                setTimeout(() => {
                    window.location.reload()
                }, 450)
            })
    }

    const cancel = () => {
        set(false)
        setAvatar(null)
        setAvatarPreview('')
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
        blob(
            e,
            setAvatarPreview,
            MaxSize['5MB'],
            'jpg', 'png'
        )
        if (e.target.files?.length) {
            setAvatar(e.target.files[0])
        }
    }

    return (
        <Modal get={get} set={set} >
            <form
                className='modal-form'
                onSubmit={(e) => e.preventDefault()}>
                <div className='mx-auto'>
                    {avatarPreview ?
                        <div className='profile-avatar'>
                            <img src={avatarPreview} alt='avatar' />
                        </div> :
                        <>
                            {data?.avatar?.url ?
                                <div className='profile-avatar'>
                                    <Image
                                        width={300}
                                        height={300}
                                        alt='avatar'
                                        loading='lazy'
                                        src={data?.avatar?.url}
                                    />
                                </div> :
                                <div className='profile-not-avatar'>
                                    <div className={`${poppins.className} font-bold text-5xl text-clr-2`}>
                                        {data?.username ? data?.username[0].toUpperCase() : '0'}
                                    </div>
                                </div>
                            }
                        </>
                    }
                </div>
                <input
                    type='file'
                    id='avatar'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => handleFile(e)}
                />
                <article className={`flex flex-col gap-5 w-fit mt-5 mb-2 tracking-wider`}>
                    <label
                        htmlFor='avatar'
                        className={`${questrial.className} change-avatar`}>
                        <AiOutlineCloudUpload />
                        <span>Change photo</span>
                    </label>
                    <button
                        type='button'
                        className={`${questrial.className} del-avatar`}
                        onClick={async () => await delAvatar()}>
                        <RiDeleteBin6Line />
                        <span>Remove photo</span>
                    </button>
                </article>
            </form>
            <div className='modal-btn-container'>
                <button
                    type='submit'
                    className='save-btn'
                    disabled={!Boolean(avatarPreview)}
                    onClick={async () => await changeAvatar()}>
                    {loading ? <LoaderThree /> : 'Save'}
                </button>
                <button
                    className='cancel-btn'
                    onClick={() => cancel()}>
                    Cancel
                </button>
            </div>
        </Modal>
    )
}

export default Avatar