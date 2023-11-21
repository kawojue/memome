import { FC } from 'react'

const Button: FC<ButtonProps> = ({
    children,
    className,
    type = 'button',
}) => {
    return (
        <button
            className={`${className} text-center rounded-[3.15px]  lg:py-[20px] lg:px-[60px] active:scale-95 transition-all duration-300 bg-vista text-memo lg:text-[20px] lg:font-medium lg:tracking-[0.4px] lg:leading-[30px] lg:rounded-[5px] border-memo py-[12px] px-[21px] text-[11px] tracking-[0.212px] font-medium leading-[15px]`}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
