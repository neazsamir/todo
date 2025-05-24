const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  const API_TOKEN = process.env.API_TOKEN
  if (!token || token !== API_TOKEN) {
    return res.status(403).json({ success: false, message: 'Forbidden: Invalid or missing token' });
  }

  next();
};

export default verifyToken;