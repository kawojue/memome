import { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { poppins, questrial } from '@/public/fonts/f'

const Input: FC<InputProps<string>> = ({
    value, label, type,
    onChange, placeholder
}) => {
    const pathName = usePathname()

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <label className={`tracking-widest tex-lg font-medium ${poppins.className}`}>
                    {label} <span className="text-clr-3 tex-lg font-bold">*</span>
                </label>
                {
                    pathName === "/login" && type === "password" &&
                    <p className={`${questrial.className} tracking-wider text-[14px] flex justify-between text-clr-5`}>
                        <Link href='/password/verify'>
                            Forgot Password?
                        </Link>
                    </p>
                }
            </div>
            <input
                type={type}
                value={value}
                autoComplete='off'
                spellCheck='false'
                autoCorrect='false'
                autoCapitalize='false'
                placeholder={placeholder}
                onChange={(e) => onChange(type === "email" ? e.target.value.toLowerCase().trim() : e.target.value)}
                className="outline-none rounded-full py-1 px-1.5 text-[15px] text-clr-4 tracking-wider border-[2px] border-clr-3 focus:border-clr-1 focus:bg-clr-11 trans"
            />
        </div>
    )
}

export default Input