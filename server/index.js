import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import authController from './controllers/authController.js';
import postController from './controllers/postController.js';
import verifyToken from './middleware/auth.js';
import User from './models/User.js';
import Post from './models/Post.js';
import { users, posts } from './data/index.js';

// CONFIGURATION

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json()); // to recognize the incoming Request Object as a JSON Object
app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common')); //  logging request details.
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors()); // access resources from remote hosts.
app.use('/assets', express.static(path.join(__dirname, 'public/assets'))); // set directory of assets

//FILE STORAGE
export const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/assets');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

// ROUTES
app.post('/auth/register', upload.single('picture'), authController.register);
app.post('/posts', verifyToken, upload.single('picture'), postController.createPost);

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);

const PORT = process.env.PORT || 6001;

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`));
		// User.insertMany(users);
		// Post.insertMany(posts);
	} catch (err) {
		console.log(err);
	}
};

connectDB();
