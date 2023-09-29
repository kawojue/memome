import { handleLevel } from '@/lib/level'
import { FC, useEffect, useState } from 'react'
import { poppins, questrial } from '@/public/fonts/f'

const Levels: FC<LevelProps> = ({ msgPoint, pollPoint }) => {
    const [data, setData] = useState<ILevel[]>([])

    useEffect(() => {
        const tempData: TempLevel[] = [
            {
                total: 800,
                type: 'message',
                point: msgPoint,
            },
            {
                total: 2225,
                type: 'poll',
                point: pollPoint,
            },
        ]

        if (msgPoint && pollPoint) {
            (async (): Promise<void> => {
                const resolvedData = await Promise.all(tempData.map(async (temp) => {
                    const promisedData = await handleLevel(temp.type, temp.point)
                    const data: ILevel = {
                        ...temp,
                        level: promisedData?.level
                    }
                    return data
                }))
                setData(resolvedData)
            })()
        }
    }, [msgPoint, pollPoint])

    return (
        <section className='flex flex-col gap-5 w-full mt-5'>
            {data?.map(({ type, level, point, total }, index) => (
                <article key={index} className='flex flex-col gap-0.5'>
                    <div className='flex items-center gap-1 tracking-wide text-sm'>
                        <span className={`${questrial.className} text-clr-4 text-xs`}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                        <span>&#8226;</span>
                        <span className='text-xs'>{point.toFixed(1)}</span>
                        <span>&#8226;</span>
                        <span className={`${poppins.className} text-clr-4 font-medium text-base`}>
                            {level}
                        </span>
                    </div>
                    <progress
                        title={`${point.toFixed(1)}`}
                        className='level-bar'
                        value={point} max={total} />
                </article>
            ))}
        </section>
    )
}

export default Levels