import ImageKit, { toFile } from '@imagekit/nodejs'


const client=new ImageKit({
    privateKey
})

export const uploadFile=async({buffer,fileName})=>{
    const response=await client.files.upload({
        file:await toFile(buffer),
        fileName:fileName,
        folder:"image"
    })
    return response
}

