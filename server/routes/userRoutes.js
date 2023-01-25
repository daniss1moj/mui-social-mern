import express from 'express';
import userController from '../controllers/userContoller.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', verifyToken, userController.getUser);
router.get('/:id/friends', verifyToken, userController.getUserFriends);

router.patch('/:id/:friendId', verifyToken, userController.addRemoveFriend);

export default router;
