import prisma from '../prisma'

const connectModels = async (id: string, url?: string) => {
    await prisma.accounts.create({
        data: {
            user: {
                connect: { id }
            }
        }
    })

    await prisma.settings.create({
        data: {
            user: {
                connect: { id }
            }
        }
    })

    await prisma.profiles.create({
        data: {
            user: {
                connect: { id }
            },
            avatar: {
                url: url || '',
                path: ''
            }
        }
    })
}

export default connectModels