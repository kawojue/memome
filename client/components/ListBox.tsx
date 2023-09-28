/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { Fragment, useEffect, FC } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const ListboxComponent: FC<ListBox> = ({
    current, listMsgs,
    selected, setSelected
}) => {
    useEffect(() => {
        if (current) {
            setSelected(
                listMsgs[listMsgs.indexOf(`${current.charAt(0).toUpperCase() + current.slice(1)}`)]
            )
        }
    }, [current])

    return (
        <div className="w-80">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selected}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-clr-0 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {listMsgs.map((msg, Idx) => (
                                <Listbox.Option
                                    key={Idx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 text-clr-0 ${active ? 'bg-clr-1' : 'text-clr-13'
                                        }`
                                    }
                                    value={msg}>
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {msg}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-clr-0">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default ListboxComponent