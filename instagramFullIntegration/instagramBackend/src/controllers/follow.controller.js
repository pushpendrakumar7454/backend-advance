import followModel from "../module/follow.module.js";

export const followUserController=async(req,res)=>{
    try {
        
        const { userId } = req.params;
        const followerId = req.user.userId;

        if(followerId.toString()==userId.toString){
            return res.status(400).json({
                message:"you can not follow yourself"
            })
        }

        const alreadyFollow=await followModel.findOne({following:userId,follower:followerId})


        if (alreadyFollow) {
            return res.status(400).json({
                message: "Already following this user"
            });
        }

        const follow=await followModel.create({
            follower:followerId,
            following:userId
        })

        return res.status(201).json({
            message:"User followed successfully",
            follow
        })

    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}