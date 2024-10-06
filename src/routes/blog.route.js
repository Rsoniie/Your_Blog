import { Router } from 'express';
import { Like_Blog, All_Blogs, Del_Blog, Comment_Blog, Get_All_Comments} from '../controllers/blogController.js';
import authenticateToken from '../middlewares/authentication.middlewares.js';

const router = Router();

router.route('/blogs').get(authenticateToken, All_Blogs);
router.route('/like/:id').get(authenticateToken, Like_Blog);
router.route('/delete/:id').get(authenticateToken, Del_Blog);
router.route('/comment/:id').post(authenticateToken, Comment_Blog);
router.route('/all_comments/:id').get(authenticateToken, Get_All_Comments);


export default router;