import express from 'express'
import { CreateUser, GetMyBlogs, LoginUser, PostBlog } from '../controllers/userController.js';
import authenticateToken from '../middlewares/authentication.middlewares.js';

import { Router } from 'express';

const router = Router();

router.route('/CreateUser').post(CreateUser);

router.route('/LoginUser').post(LoginUser);

router.route('/PostBlog').post(authenticateToken, PostBlog);

router.route('/GetMyBlogs').get(authenticateToken, GetMyBlogs);




export default router;