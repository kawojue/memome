import { FC } from 'react'

const Input: FC<InputProps<string>> = ({
    type,
    value,
    label,
    onChange,
    className,
    maxLength,
    placeholder,
}) => {
    return (
        <div className='flex items-center w-full'>
            <div className='bg-clr-14 rounded-l-md text-[12px] md:text-[14px] border-y-[0.5px] boder-x-[0.5px] px-2 py-1 tracking-wide'>
                {label}
            </div>
            <input
                type={type}
                value={value}
                autoComplete='off'
                spellCheck='false'
                autoCorrect='false'
                autoCapitalize='false'
                placeholder={placeholder}
                maxLength={maxLength || 1_000}
                onChange={(e) => onChange(e.target.value)}
                className={`text-clr-16 rounded-r-md text-[15px] outline-none border-y-[0.5px] border-x-[0.5px] focus:border-clr-15 px-1 py-0.5 ${className}`}
            />
        </div>
    )
}

export default Input