import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String, 
        required: true,  
    },
    password: {
        type: String,
        required: true,
    },
    profile_pic: {
        type: String,
    },
    liked_blogs: [{
        type: Schema.Types.ObjectId,
        ref: "Blogs"
    }]
    

    
    

},{timestamps: true})


export const User = mongoose.model("User", UserSchema);