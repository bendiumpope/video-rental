const User = require('../models/userModel')
const HttpError = require('../models/httpError')


exports.getAllUsers = async (req, res, next) => {

    try {
        const users = await User.find({}, '-password');

  
        res.status(200).json({
          status: 'success',
          requestedAt: req.requestTime,
          results: users.length,
          data: {
            data: users
          }
        });
        
    } catch (err) {
        
        return next(new HttpError('Fetching users failed', 500));
    }

};
  
exports.updateUser = async (req, res, next) => {

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
      
          if (!user) {
            return next(new HttpError('No user found with that ID', 404));
          }
      
        res.status(200).json({
            status: 'success',
            data: {
              data: user
            }
        });
        
    } catch (err) {
        return next(new HttpError('An error occured, user update failed!', 500));
    }
    
};
  
exports.getUser = async (req, res, next) => {
    
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
          return next(new HttpError('No user found with that ID', 404));
        }
    
        res.status(200).json({
          status: 'success',
          data: {
            data: user
          }
        });      
    } catch (err) {
        return next(new HttpError('An error occured, fetching user failed!', 500));
    }
 
};
  
exports.deleteUser = async (req, res, next) => {
    
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
          return next(new HttpError('No user found with that ID', 404));
        }
    
        res.status(204).json({
          status: 'success',
          data: null
        });
        
    } catch (err) {
        return next(new HttpError('An error occured, deleting user failed!', 500));
    }
    
  };