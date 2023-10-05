"use client"
import { FC } from 'react'

const LoaderOne: FC = () => {
    return (
        <article className="loading-spin">
            <div className="spin-sector spin-sector-1"></div>
            <div className="spin-sector spin-sector-2"></div>
            <div className="spin-sector spin-sector-3"></div>
        </article>
    )
}

const LoaderTwo: FC = () => {
    return (
        <main className="w-full h-full flex justify-center mt-20">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </main>
    )
}

const LoaderThree: FC = () => {
    return <div className="loader"></div>
}

export { LoaderOne, LoaderTwo, LoaderThree }