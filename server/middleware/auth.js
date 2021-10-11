const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if no token
    if(!token) {
        return res.status(401).json({
            success: false,
            msg: 'No token, auth denied'
        })
    }

    //verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //set user id in req.user
        req.user = decoded.user;
        next();
    } catch (error) {
        req.status(401).json({
            success: false,
            msg: 'Token is not valid'
        })
    }
}