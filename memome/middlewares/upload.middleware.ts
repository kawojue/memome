import multer, { StorageEngine, Multer } from 'multer'

const storage: StorageEngine = multer.memoryStorage()
const upload: Multer = multer({ storage })

export default upload