import { FC } from 'react'
import { Menu } from '@headlessui/react'
import { poppins } from '@/public/fonts/f'

const MenuItem: FC<MenuItem> = ({ Icon, content, handler }) => {
    return (
        <div className="px-1 py-0.5">
            <Menu.Item>
                {({ active }) => (
                    <button
                        onClick={() => handler()}
                        className={`${poppins.className} ${active ? 'bg-clr-1 rounded-md text-clr-0' : 'font-medium'} w-full items-center flex gap-3 px-2 py-0.5`}>
                        {active ? (
                            <Icon
                                aria-hidden='true'
                                className='text-clr-0'
                            />
                        ) : (
                            <Icon
                                aria-hidden='true'
                                className='text-clr-1'
                            />
                        )}
                        {content}
                    </button>
                )}
            </Menu.Item>
        </div>
    )
}

export default MenuItem