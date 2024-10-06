import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js';
import { Blogs } from '../models/blog.models.js';



const All_Blogs = async (req, res) => {

    const allblogs = await Blogs.find();
    return res.status(200).json({message: 'All blogs are requested', allblogs});
};

const Like_Blog = async (req, res) => {

    const user_id = req.user.userId;
    const blog_id = req.params.id;  
    console.log("This is blog_id:", blog_id);
    console.log("This is userId", user_id);

    try
    {
        const curr_blog = await Blogs.findByIdAndUpdate(blog_id);
        const curr_user = await User.findByIdAndUpdate(user_id);
        if (!curr_blog || !user_id) {
            return res.status(404).json({ message: "Blog not found" });
        }
        // console.log("This is current blog:", curr_blog);

        if(!curr_blog.liked_ids.includes(user_id))
        {
        curr_blog.likes += 1;
        curr_blog.liked_ids.push(user_id);
        curr_user.liked_blogs.push(blog_id);
        await curr_blog.save();
        await curr_user.save();
         const newlikes = curr_blog.likes;
          return res.status(200).json({message: "Liked this Blog", updatedLikes:  newlikes});
        }
        else 
        {
            return res.status(400).json({message: "Already like in this Blog"});
        }
    
    }
    catch(error)
    {
    //   console.log("Error retrieving Blog", error);
      return res.status(401).json({message: "error", error})
    }

};

const Del_Blog = async (req, res) => {


    try{
     const blog_id = req.params.id;
     if(!blog_id)
     {
        return res.status(400).json({message: "No blog is selected"});
     }

     const curr_blog = await Blogs.findByIdAndDelete(blog_id);

     return res.status(200).json({message: "Blog Deleted Successfully"});
    }
    catch(error)
    {
        console.log("This is error while fetching the blog_Id", error);
        return res.status(500).json({message: "Internal server error", error});
    }

     
};

// const Comment_Blog = async (req, res) => {

//     try{
//        const blog_id = req.params.id;
//        console.log("This is blog_id", blog_id);
//        const blog = await Blogs.findByIdAndUpdate(blog_id);

//        const {comment} = req.body;

//        const user = req.user.userId;
//        console.log(user);
//        const this_user = await User.findById(user);
//     //    console.log(this_user);
//        const user_name = this_user.username;
//        console.log(user_name);
//        const this_comment = {
//         comment,
//         user,
//         user_name,
//        }

//        blog.comments.push(this_comment);

//        await blog.save();
//        return res.status(200).json({message: "Commented Sucessfully", user_name});
//     }
//     catch(error)
//     {
//         console.log("This is error while fetching the blog", error);
//         return res.status(400).json({message: "Internal server error", error});
//     }
// };


const Comment_Blog = async (req, res) => {
    try {
        const blog_id = req.params.id;
        console.log("This is blog_id", blog_id);

        const blog = await Blogs.findByIdAndUpdate(blog_id);

        const { comment } = req.body;
        const user = req.user?.userId;  // Optional chaining to avoid errors if user is not present
        console.log("User ID from req.user:", user);

        if (!user) {
            return res.status(400).json({ message: "User not authenticated" });
        }

        const this_user = await User.findById(user);
        console.log("User fetched from DB:", this_user);

        if (!this_user) {
            return res.status(404).json({ message: "User not found" });
        }

        const user_name = this_user.username;
        console.log("Fetched Username:", user_name);

        const this_comment = {
            comment,
            user,
    
        };

        blog.comments.push(this_comment);
        await blog.save();

        return res.status(200).json({ message: "Commented Successfully", user_name });
    } catch (error) {
        console.log("This is error while fetching the blog", error);
        return res.status(400).json({ message: "Internal server error", error });
    }
};

const Get_All_Comments = async (req, res) => {
    try{
        const blog_Id = req.params.id;
        if(!blog_Id)
        {
            return res.status(400).json({message: "No blog found"});
        }
        console.log(blog_Id);
        const curr_blog = await Blogs.findById(blog_Id);
        // console.log(curr_blog);
        const net_comments = curr_blog.comments;
        console.log(net_comments);
        return res.status(200).json({message: "this is blog_id", net_comments});
    }
    catch(error)
    {
        console.log("This is error while fetching the blog", error);
        return res.status(400).json({message: "Error in fetching", error});
    }
}





export {Like_Blog, All_Blogs,
     Del_Blog, Comment_Blog, Get_All_Comments};