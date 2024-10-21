const jwt = require('jsonwebtoken');
exports.adminAuth = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  try {
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Invalid Token' });
  }
  next();
};
