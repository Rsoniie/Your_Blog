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

          return res.status(200).json({message: "Liked this Blog"});
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

const Comment_Blog = async (req, res) => {

    try{
       const blog_id = req.params.id;
       console.log("This is blog_id", blog_id);
       const blog = await Blogs.findByIdAndUpdate(blog_id);
       const {comment} = req.body;
       const user = req.user.userId;

       const this_comment = {
        comment,
        user
       }

       blog.comments.push(this_comment);

       await blog.save();
       return res.status(200).json({message: "Commented Sucessfully"});
    }
    catch(error)
    {
        console.log("This is error while fetching the blog", error);
        return res.status(400).json({message: "Internal server error", error});
    }
};





export {Like_Blog, All_Blogs,
     Del_Blog, Comment_Blog};