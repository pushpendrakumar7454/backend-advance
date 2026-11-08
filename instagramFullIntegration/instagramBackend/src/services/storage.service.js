import imageKit, { toFile } from '@imagekit/nodejs'
import config from '../app/config/config.js'

const client=new imageKit({
    privateKey:config.IMAGEKIT_PRIVATE_KEY
})

export const uploadFile=async()=>{
    const response=await client.files.upload({
        file:await toFile(buffer),
        fileName:fileName,
        folder:"instgram"
    })

    return response
}