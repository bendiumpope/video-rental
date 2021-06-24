const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'name of user is required!']
    },
    title: {
        type: String,
        required: [true,'title of video is required!']
    },
    numDays: {
        type: Number,
        required: [true,'Number of days for rent is required!']
    },
    rentalCost: {
        type: String,
        required: [true,'Cost of rental is required!']
    }

},
{
    toJSON:{ virtuals: true },
    toObject: { virtual: true }
});

const Price = mongoose.model('Price', priceSchema);

module.exports = Price;