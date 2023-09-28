import notify from './notify'

const throwError = (err: any): void => {
    const msg = err.response?.data?.msg
    if (msg) {
        notify('error', msg)
    } else {
        notify('error', err.code)
    }
}

export default throwError