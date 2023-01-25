import express from 'express';
import postController from '../controllers/postController.js';
import verifyToken from '../middleware/auth.js';
const router = express.Router();

router.get('/', verifyToken, postController.getFeedPosts);
router.get('/:userId/posts', verifyToken, postController.getUserPosts);

router.patch('/:id/like', verifyToken, postController.likePost);
router.route('/:id/comments').post(verifyToken, postController.addComment);

export default router;
