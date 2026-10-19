import multer from 'multer'


const storage=multer.memoryStorage()

const upload=multer({
    storage,
    limits:5
})

export default upload

