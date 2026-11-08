import { uploadFile } from "../services/storage.service";

export const createPostController=async(req,res)=>{
    try { 
     const {caption, song, hashtags,location } = req.body;

     const userId=req.user.userId

    const imageFiles = req.files?.images || [];
    const videoFiles = req.files?.videos || [];

    const uploadImage=await Promise.all(
        imageFiles.map(async(file)=>{
            const result=await uploadFile(
                  file.buffer,
                  file.originalname
            )
              return {
                    url: result.url,
                    fileId: result.fileId
                };
        })
    )

            const uploadedVideos = await Promise.all(
            videoFiles.map(async (file) => {
                const result = await uploadFile(
                    file.buffer,
                    file.originalname
                );

                return {
                    url: result.url,
                    fileId: result.fileId
                };
            })
        );
       
           const post = await postModel.create({
            user: userId,
            caption,
            images: uploadedImages,
            videos: uploadedVideos,
            song,
            hashtags,
            location
        });

        return res.status(201).json({
            message:"post created succefully",
            data:post
        })

    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}