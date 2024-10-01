import {User} from '../models/user.models.js'
import { Blogs } from '../models/blog.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';




const SECRET_KEY = process.env.SECRET_KEY;


const CreateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body; // Req.body for getting from info from body...

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'userName, email, and password are required.' });
        }

        const existingmail = await User.findOne({ email });
        const existingusername = await User.findOne({username})
        if (existingmail) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        if(existingusername)
        {
            return res.status(400).json({message: 'User already exists with this username.'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,  
        });

        await newUser.save();

        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Server error, please try again later.' });
    }

};

const LoginUser = async (req, res) => {
     try 
     {
        const {username, password} = req.body;

        if(!username || !password)
        {
            return res.status(400).json({ message: 'userName, password are required.' });
        }

        const user = await User.findOne({username});
        if(!user)
        {
            return res.status(400).json({message: 'Username not exist '});
        }

        const isPasswordmatch = await bcrypt.compare(password, user.password);

        if(!isPasswordmatch)
        {
            return res.status(400).json({message: 'Invalid Credentials'});
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        console.log("This is login");
        console.log(token);
        res.status(200).json({message: 'User logged In successfully', token, user});
     }
     catch (error) {
        console.error('Error Login user:', error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};

const PostBlog = async (req, res) => {
    try{
        const user_id = req.user.userId;
        if(!user_id)
        {
            return res.status(400).json({message: 'Logged In user not found'});
        }
        // console.log("This is logged_user", logged_user.userId);
        const {blog_heading, blog_body} = req.body;

        if(!blog_heading || !blog_body)
        {
            return res.status(400).json({message: 'Heading and body both required'});
        }
        

        console.log(user_id);
        const newBlog = new Blogs({
            blog_heading, 
            blog_body,
            user_id
        });
        
        const savedBlog = await newBlog.save();
        return res.status(200).json({message:"Posted Sucesssfully", blog: savedBlog});
       
  
    }
    catch (error) {
        console.error('Error Login user:', error);
        return res.status(500).json({ message: 'Server error, please try again later.' });
    }
};

const GetMyBlogs = async (req, res) => 
{
    try{
        const user_id = req.user.userId;
        console.log("This is userId", user_id);
        const my_blogs = await Blogs.find({user_id});

        if(my_blogs.length == 0)
        {
            return res.status(400).json({message: "No blogs found"});
        }

        
        res.status(200).json({message: "Your Blogs", my_blogs});
       
    }
    catch (error) {
        console.error('Error fetching Blogs:', error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
}



export {
    CreateUser,
    LoginUser,
    PostBlog,
    GetMyBlogs,
}


