import { Router } from 'express';
import { Like_Blog, All_Blogs} from '../controllers/blogController.js';
import authenticateToken from '../middlewares/authentication.middlewares.js';

const router = Router();


// const id = "66f945f8fd17dd0ccb668ccc";
router.route('/blogs').get(authenticateToken, All_Blogs);
router.route('/like/:id').get(authenticateToken, Like_Blog);



export default router;