import { FC, Fragment } from 'react'
import { poppins } from '@/public/fonts/f'
import { ImCancelCircle } from '@/public/icons/ico'
import { Dialog, Transition } from '@headlessui/react'

const Modal: FC<ModalProps> = ({ children, get, set }) => {
    return (
        <>
            <Transition appear show={get} as={Fragment}>
                <Dialog as="div" className="relative z-[999]" onClose={() => set(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-clr-12 p-6 text-left align-middle shadow-xl transition-all">
                                    <button
                                        className={`${poppins.className} absolute top-2 right-2 p-2 bg-clr-4 text-clr-0 font-semibold text-lg md:text-xl trans hover:text-clr-6 hover:bg-clr-5 rounded-full`}
                                        onClick={() => set(!get)}>
                                        <ImCancelCircle />
                                    </button>
                                    {children}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Modal