import multer from 'multer'

const storage=multer.memoryStorage()

const upload=multer({storage,limits:10})

export default upload
