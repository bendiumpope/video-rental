const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoTitle: {
        type: String,
        required: [true,'Video title is required!']
    },
    videoType: {
        type: String,
        enum: ['regular', 'children-movie', 'new-release'],
        default: 'regular'
    },
    videoGenre: {
        type: String,
        enum: ['action', 'drama', 'romance', 'comedy', 'horror'],
        default: 'regular'
    },        
    maximumAge: Number,
    yearReleased: String,
    creator:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }


},
{
    toJSON:{ virtuals: true },
    toObject: { virtual: true }
});

///populating the creator field using referencing
videoSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'creator',
        select: '-__v'
    });   

    next();
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;