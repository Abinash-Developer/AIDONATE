const jwt = require('jsonwebtoken');
const validUserMiddleware = (req, res, next) => {
    try {
        const userData = jwt.verify(req.session.token, 'your_jwt_secret');
        if (userData.role === 'admin') {
            next();
        } else {
         res.redirect('login');
        }
    } catch (err) {
         res.redirect('login');
    }
};

module.exports = validUserMiddleware;
