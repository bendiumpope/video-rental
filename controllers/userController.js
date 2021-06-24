const User = require('../models/userModel')
const HttpError = require('../models/httpError')

// @desc    For Get All Users.
// @route   GET /api/v1/users
// @access  Public
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

// @desc    For Update User. This allow a patch request to update a user's detail.
// @route   PATCH /api/v1/users/:id
// @access  Private
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

// @desc    For Get User. This  gets a registered user by id.
// @route   GET /api/v1/users/:id
// @access  Private
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

// @desc    For Delete a User. This deletes a registered.
// @route   DELETE /api/v1/users/:id
// @access  Private
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