import {
    Prompt, Montserrat_Alternates,
    Inter, Poppins, Questrial, Lato,
} from 'next/font/google'

const questrial = Questrial({
    weight: '400',
    subsets: ['latin']
})

const inter = Inter({
    weight: ['400', '500', '700'],
    subsets: ['latin']
})

const lato = Lato({
    weight: ['400', '700'],
    subsets: ['latin']
})

const poppins = Poppins({
    weight: ['400', '700'],
    subsets: ['latin']
})

const prompt = Prompt({
    weight: ['400', '700'],
    subsets: ['latin']
})

const monst = Montserrat_Alternates({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
})

export {
    prompt, monst,
    inter, poppins,
    lato, questrial,
}