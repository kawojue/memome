import Image from 'next/image'
import { FC, useRef } from 'react'
import html2Canvas from 'html2canvas'
import download from '@/utils/download'
import { prompt } from '@/public/fonts/f'
import { getPeriod } from '@/utils/period'
import { BsDownload } from '@/public/icons/ico'

const Message: FC<{ message: MessageStates }> = ({ message }) => {
    const captureDivRef = useRef<HTMLDivElement>(null)

    function downloadHTMLTemplate(id: string, messageTexts: string) {
        //         const containerStyles = `
        //     display: flex;
        //     justify-content: center;
        //     align-items: center;
        //     width: 100%;
        //     min-height: 220px;
        //     border-radius: 30px;
        //     padding: 3px;
        //     background-color: #yourBackgroundColor;
        //     box-shadow: 10px 10px 18px 0 rgba(0, 0, 0, 0.3),
        //                 inset -10px -10px 18px 0 rgba(0, 0, 0, 0.3),
        //                 inset 10px 10px 18px 0 rgba(255, 255, 255, 0.2);
        //   `

        //         const htmlContent = `
        //     <div style="${containerStyles}">
        //       <div class="your-prompt-class">${messageTexts}</div>
        //       <span style="position: absolute; top: 2px; left: 3px; font-size: 12px; color: #yourTextColor;">
        //         ${getPeriod(message.date)} ago
        //       </span>
        //     </div>
        //   `

        //         const blob = new Blob([htmlContent], { type: 'text/html' })

        //         const canvas = document.createElement('canvas')
        //         const ctx = canvas.getContext('2d')
        //         const img = new Image()
        //         img.src = URL.createObjectURL(blob)

        //         img.onload = () => {
        //             canvas.width = img.width
        //             canvas.height = img.height
        //             ctx.drawImage(img, 0, 0)
        //             canvas.toBlob((pngBlob) => {
        //                 const downloadLink = document.createElement('a')
        //                 downloadLink.href = URL.createObjectURL(pngBlob)
        //                 downloadLink.download = `memome_${id}.png`
        //                 downloadLink.click()
        //             }, 'image/png')
        //         }
    }


    return (
        <>
            <article
                className={` ${message.files.length === 0 && 'flex items-center justify-center'} relative sm:min-h-[235px] md:min-h-[250px] min-h-[220px] rounded-[30px] p-3 bg-clr-11 max-w-[300px] w-[90vw]`}
                style={{
                    boxShadow: `10px 10px 18px 0 rgba(0, 0, 0, 0.3), inset -10px -10px 18px 0 rgba(0, 0, 0, 0.3), inset 10px 10px 18px 0 rgba(255, 255, 255, 0.2)`
                }}>
                {message.files.length === 0 ?
                    <>
                        {message.texts &&
                            <div
                                ref={captureDivRef}
                                className={`${prompt.className} text- [1.2em] text-center text-clr-13 mt-2`}
                                style={{
                                    fontSize: '1.2em',
                                    textAlign: 'center',
                                }}
                                dangerouslySetInnerHTML={{ __html: message.texts }}
                            />}
                        {/* <button
                            onClick={() => downloadHTMLTemplate(message.id, message.texts as string)}
                            className='absolute bottom-3 right-4 text-lg font-semibold text-black'>
                            <BsDownload />
                        </button> */}
                    </> :
                    <article className='h-full flex flex-col justify-between'>
                        {message.texts &&
                            <div
                                className={`${prompt.className} text-[1.2em] text-center text-clr-13 mt-3`}
                                dangerouslySetInnerHTML={{ __html: message.texts }}
                            />}
                        <div className='flex gap-2 mt-4 h-[180px]'>
                            {message.files.map((file) => (
                                <div
                                    key={file.idx}
                                    className='relative w-full h-full rounded-[30px] object-cover overflow-hidden shadow-md'>
                                    {file.type === 'image/png' || file.type === 'image/jpeg' ?
                                        <Image
                                            priority
                                            width={300}
                                            height={300}
                                            src={file.url}
                                            alt={file.idx}
                                            className='w-full h-full object-cover'
                                        /> :
                                        <video
                                            controls
                                            width="300"
                                            height="300"
                                            className='w-full h-full overflow-hidden object-cover'>
                                            <source
                                                src={file.url}
                                                type={file.type} />
                                            Your browser does not support the video tag.
                                        </video>
                                    }
                                    <button
                                        onClick={() => download(file.url)}
                                        className='absolute bottom-3 right-4 text-lg font-semibold text-black'>
                                        <BsDownload />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </article>
                }
                <span className={`absolute top-2 left-3 text-xs font-medium text-clr-15`}>
                    {getPeriod(message.date)} ago
                </span>
            </article>
        </>
    )
}

export default Message