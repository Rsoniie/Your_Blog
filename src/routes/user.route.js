import express from 'express'
import { CreateUser, LoginUser, PostBlog } from '../controllers/userController.js';
import authenticateToken from '../middlewares/authentication.middlewares.js';

import { Router } from 'express';

const router = Router();

router.route('/CreateUser').post(CreateUser);

router.route('/LoginUser').post(LoginUser);

router.route('/PostBlog').post(authenticateToken, PostBlog);


export default router;