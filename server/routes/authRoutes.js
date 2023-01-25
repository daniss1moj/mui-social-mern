import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';
import multer from 'multer';

router.route('/login').post(authController.login);

export default router;
