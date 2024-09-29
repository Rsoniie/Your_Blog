import express from 'express'
import { CreateUser, LoginUser } from '../controllers/userController.js';

import { Router } from 'express';

const router = Router();

router.route('/CreateUser').post(CreateUser);

router.route('/LoginUser').post(LoginUser);


export default router;