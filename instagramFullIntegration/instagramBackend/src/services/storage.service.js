import imageKit, { toFile } from '@imagekit/nodejs'

const client=new imageKit({
    privateKey
})

export const uploadFile=async()=>{
    const response=await client.files.upload({
        file:await toFile(buffer),
        fileName:fileName,
        folder:"instgram"
    })

    return response
}