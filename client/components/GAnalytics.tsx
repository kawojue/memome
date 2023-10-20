"use client"
import Script from 'next/script'

const GAnalytics = () => {
    return (
        <>
            <Script async
                id='ga'
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!}`}
            />
            <Script id='google-analytics'>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!});
            `}
            </Script>
        </>
    )
}

export default GAnalytics