"use client"
import { poppins } from '@/public/fonts/f'
import { ChangeEvent, FC, useRef } from 'react'
import { formatSize } from '@/utils/formatNumber'
import { AiOutlineCloudUpload } from '@/public/icons/ico'

const MediasUpload: FC<MediaUploadProps> = ({ get, set, id }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList: File[] = []
        const files = e.target.files

        for (let i = 0; i < files!.length; i++) {
            fileList.push(files![i])
        }

        set(fileList)
    }

    return (
        <section className='py-1.5 px-0.5 mt-2'>
            <h6 className={`flex gap-2 items-center text-[16px] font-medium tracking-wide ${poppins.className}`}>
                <span className='text-clr-4'>Media</span>
                <span className='text-clr-7'>*</span>
            </h6>
            <label htmlFor={id}
                className='flex justify-between gap-2 items-center border-[2px] border-dashed border-clr-17 min-h-[50px] w-full rounded-xl mt-2 px-2 py-1.5 cursor-pointer'>
                <AiOutlineCloudUpload />
                <div className='flex flex-col gap-2 text-xs flex-shrink items-center'>
                    {!get && <span>Maximum of two files.</span>}
                    <span>JPG, MP4, PNG - 9MB</span>
                    {get &&
                        <span>
                            {
                                `${get.length} file(s) - ${get?.map((media) => formatSize(media.size))}`
                            }
                        </span>}
                </div>
                {get ?
                    <button
                        onClick={() => set(null)}
                        className={`${poppins.className} px-1 py-0.5 rounded-full text-sm border-[1px] border-clr-11 hover:bg-clr-6 hover:text-clr-5 trans`}>
                        Clear
                    </button> :
                    <button
                        onClick={() => handleFileButtonClick()}
                        className={`${poppins.className} px-1 py-0.5 rounded-full text-sm border-[1px] border-clr-11 hover:bg-clr-6 hover:text-clr-5 trans`}>
                        Browse
                    </button>
                }
            </label>
            <input
                id={id}
                multiple
                type='file'
                className='hidden'
                ref={fileInputRef}
                onChange={(e) => handleFile(e)}
            />
        </section>
    )
}

export default MediasUpload