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
    }

},{timestamps:true})

export const Blogs = mongoose.model("Blogs", blogs);