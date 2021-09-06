const User = require('../model/User');
const jwt = require('jsonwebtoken');

exports.verifyUser = async (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            let verify = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY)

            let user = await User.findOne({ _id: verify._id })
            req.user = user
            req.isLoggedIn = true
            next()
        }
        req.isLoggedIn = false
        next()
    } catch (error) {
        next(error)
    }
}