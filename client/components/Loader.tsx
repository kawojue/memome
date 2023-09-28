const LoaderOne: React.FC = () => {
    return (
        <article className="loading-spin">
            <div className="spin-sector spin-sector-1"></div>
            <div className="spin-sector spin-sector-2"></div>
            <div className="spin-sector spin-sector-3"></div>
        </article>
    )
}

const LoaderTwo: React.FC = () => {
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

const LoaderThree: React.FC = () => {
    return <div className="loader"></div>
}

const ProgressBarLoader: React.FC = () => {
    return (
        <div className="progress">
            <div className="color"></div>
        </div>
    )
}

export { LoaderOne, LoaderTwo, LoaderThree, ProgressBarLoader }