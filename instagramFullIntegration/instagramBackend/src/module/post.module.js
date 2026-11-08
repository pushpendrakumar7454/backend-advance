import mongoose, { mongo } from 'mongoose'

const  postSchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"fullIntegretionInstagramusers",
        required:true
    },
    caption:{
        type:String,
        trim:true,
        maxLength:2200
    },
    images:[
        {
            url:{
                type:String,
                required:true
            },
           fieldId:{
            type:String
           }
        }
    ],

    videos:[
        {
            url:{
                type:String,

            },
            fieldId:{
                type:String
            }
        }
    ],
    song:{
        type:mongoose.Types.ObjectId,
        ref:"",
        default:null
    },
    songStartTime:{
        type:Number,
        default:0
    },
    hashTags:[
        {
            type:mongoose.Types.ObjectId,
            ref:"",

        }
    ],
    location:{
        name:{
            type:String,
            trim:true
        },
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        }
    },
    likeCount:{
        type:Number,
        default:0
    },
    commentCount:{
        type:Number,
        default:0
    },
    isArchived:{

        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const postModel=mongoose.model("fullInstagramPostModel",postSchema)

export default postModel