import mongoose, {Schema} from "mongoose";

const blogs = new Schema({
    blog_heading: {
        type: String,
        required : true,
    },
    blog_body: {
        type: String,
        required: true,
    },
    blog_description: {
        type: String,
    },
    
    blog_keywords : [String],

    blog_img: {
        type: String
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    liked_ids: [ {
        type: Schema.Types.ObjectId,
        ref: "Users"

    }],
    likes: {
        type : Number, 
        default: 0
    }

},{timestamps:true})

export const Blogs = mongoose.model("Blogs", blogs);