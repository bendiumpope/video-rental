const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const HttpError = require('../models/httpError');

const signToken = id => {
    return jwt.sign(
        { id: id }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    
    //remove the password from the output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user: user
        }
    });    
}

exports.signup = async (req, res, next) => {

    try {
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            });
    
        createSendToken(newUser, 201, res);
    
    } catch (err) {

        return next(new HttpError('Signing up user failed', 500));  
    }
    
};

exports.login = async(req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        
        return next(new HttpError('Please provide email and password!', 400));
    }

    try {
        
        const user = await User.findOne({ email }).select('+password');

        if(!user || !await user.correctPassword(password, user.password)){

            return next(new AppError('Incorrect email or password', 401));
        }
        
        createSendToken(user, 200, res);

    } catch (err) {

        return next(new HttpError('Login user failed', 400));
    }    
};