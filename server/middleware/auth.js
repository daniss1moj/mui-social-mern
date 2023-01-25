import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(403).send('Access denied');
		}

		const token = authHeader.split(' ')[1];

		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};

export default verifyToken;
