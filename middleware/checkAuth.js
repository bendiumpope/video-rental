const jwt = require('jsonwebtoken');
const HttpError = require('../models/httpError');

/* @desc    This function protects endpoints when registered as a middleware to 
ensure a user is authenticated and authorized to access that endpoint */

module.exports = (req, res, next) => {

    if(req.method === 'OPTIONS'){
        return next();
    }

    try{
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token){
            throw new Error('Authentication failed!');
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodedToken.id, name: decodedToken.name };

        next();
        
    }catch(err){
        const error = new HttpError('Authentication failed!', 403);

        return next(error);
    }
};