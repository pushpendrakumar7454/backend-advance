import followModel from "../module/follow.module.js";



export const followUserController = async (req, res) => {
    try {
        const { userId } = req.params;
        const followerId = req.user.userId;

        if (followerId.toString() === userId) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            });
        }

        const alreadyFollow = await followModel.findOne({
            follower: followerId,
            following: userId
        });

        if (alreadyFollow) {
            return res.status(400).json({
                message: "Already following this user"
            });
        }

        const follow = await followModel.create({
            follower: followerId,
            following: userId
        });

        return res.status(201).json({
            message: "User followed successfully",
            follow
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


export const unfollowUserController=async(req,res)=>{
    try {
        
        const { userId } = req.params;
        const followerId = req.user.userId;


        const unfollow=await followModel.findOneAndDelete({follower:followerId,following:userId})

        if(!unfollow){
            return res.status(401).json({
                message:"you are not following this user"
            })
        }

          return res.status(200).json({
            message: "User unfollowed successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }

}