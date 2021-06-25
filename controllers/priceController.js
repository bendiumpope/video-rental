const Video = require('../models/videoModel');
const Price = require('../models/priceModel');
const HttpError = require('../models/httpError');
const { videoRentalPrice } = require('../utils/videoPrice')

// @desc    For create price. This calculates the cost of renting a movie for a given number of days.
// @route   POST /api/v1/videos/price
// @access  Private
exports.createPrice = async (req, res, next) => {

    let { title, numDays } = req.body;
    videoTitle = title.toLowerCase()
    
    let video

    try {

        video = await Video.findOne({ videoTitle });

    } catch (err) {

        return next(new HttpError('Something went wrong, please try again.', 500))
    }

    if (!video) {

        return next(new HttpError('No video found with that title', 401));
    }

    let videoType = video.videoType;
    let options = {}

    if (video.videoType === "children-movie") {
        options.maximumAge = video.maximumAge
    
    } else if (video.videoType === "new-release") {
        options.years = video.yearReleased
    }

    let rentalCost = videoRentalPrice(videoType, numDays, options);

    try {
        const rentalPrice = await Price.create({
            name: req.userData.name,
            title: videoTitle,
            numDays: numDays,
            rentalCost: `${rentalCost} Birr`
        });

        res.status(201).json({
            status: 'success',
            data: {
                data: rentalPrice
            }
        });
        
    } catch (err) {

        return next(new HttpError('Something went wrong, please try again', 500))
    }
    
};