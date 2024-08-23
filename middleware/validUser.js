const jwt = require('jsonwebtoken');
const validUserMiddleware = (req, res, next) => {
    try {
        const userData = jwt.verify(req.session.token, 'your_jwt_secret');
        if (userData.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token. Access denied.' });
    }
};

module.exports = validUserMiddleware;
