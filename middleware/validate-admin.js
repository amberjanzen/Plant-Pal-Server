const jwt = require('jsonwebtoken')
const User = require("../db").import("../models/user");

const validateAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({auth: false, message: 'Invalid Credentials. Please sign in.'})
    } else {
        jwt.verify(token, process.env.SECRETKEY, (err, decodeToken) => {
            if (!err && decodeToken) {
                User.findOne({
                    where: {
                        id: decodeToken.id,
                        admin: true
                    }
                })
                .then(user => {
                    if (!user) 
                    {
                        return res.status(401).send({isAdmin: false, message: 'Unauthorized'})
                    }
                    req.user = user;
                    return next();
                })
                .catch(err => next(err))
            } else {
                req.errors = err;
                return res.status(500).send('Admin only.')
            }
        })
    }
}
module.exports = validateAdmin;