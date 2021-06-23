const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please tell us your name']
    },    
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },    
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        select: false
    },    
    confirmPassword: {
        type: String,
        required: [true, 'confirmPassword is required'],
        validate: {
            validator: function (el){
                return el === this.password;
            },
            message: 'Password and confirmPassword must match'
        }
    }
},
{
    toJSON:{ virtuals: true },
    toObject: { virtual: true }
});

userSchema.pre('save', async function(next){

    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema);

module.exports = User;