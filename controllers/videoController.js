const Video = require('../models/videoModel')
const HttpError = require('../models/httpError');
const APIFeatures = require('../utils/apiFeatures')
const { calVideoPrice } = require('../utils/videoPrice')


// @desc    For Create Video.
// @route   POST /api/v1/videos
// @access  Private
exports.createVideo = async (req, res, next) => {

    
    if (req.body.videoType === 'children-movie' && !req.body.maximumAge) {
                
        return next(new Error('Maximum age is required for children movies'));
        
    } else if (req.body.videoType === 'new-release' && !req.body.yearReleased) {
                
        return next(new Error('Year of Release is required for new release movies'));
    }
    
    req.body.creator = req.userData.userId
    let title = req.body.videoTitle
    title = title.toLowerCase()
    req.body.videoTitle = title


    try {
        const newVideo = await Video.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
              data: newVideo
            }
        });
        
    } catch (err) {
        
        return next(new HttpError('Creating a Video record failed, please try again.', 500))
    }
    
};

/* @desc    For Get All Videos. This route returns all created videos paginated with 5 videos per page.
   the route can also take queries as to sort the response by given fileds*/
// @route   GET /api/v1/videos/videolist
// @access  Public
exports.getAllVideos = async (req, res, next) => {

        ///QUERY EXECUTION
    try {
        const features = new APIFeatures(Video.find().select({ maximumAge: 0, yearReleased: 0, creator:0}), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

        const videos = await features.query;


        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: videos.length,
            data: {
                videos: videos
            }
        });        
    } catch (err) {
        return next(new HttpError('Fetching videos failed, please try again.', 500));
    }
      
};

/* @desc    For Get A Video. This route returns cost of a video whose id was
   passed as a parameter to the route. */
// @route   GET /api/v1/videos/:id
// @access  Private
exports.getVideo = async (req, res, next) => {

    let singleVideo
    try {
        singleVideo = await Video.findById(req.params.id);

    } catch (err) {
        return next(new HttpError('Something went wrong, please try again.', 500)); 
    }

    const moviePrice = calVideoPrice(singleVideo.videoType)

    if (!singleVideo) {
      return next(new HttpError('No video found with that ID', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        price: `This movie cost: ${moviePrice} Birr/Day`
      }
    });

};

/* @desc    For Update Video. This route allow a user update a video whose id was
   passed as a parameter to the route. */
// @route   PATCH /api/v1/videos/:id
// @access  Private
exports.updateVideo = async (req, res, next) => {

    let video;
    try {
        
        video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    } catch (err) {
        return next(new HttpError('Something went wrong, updating video failed.', 500));
    }
    
    if (!video) {
        return next(new HttpError('No video found with that ID', 404))
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            data: video
        }
    });
};

/* @desc    For Delete Video. This route allow a user delete a video whose id was
   passed as a parameter to the route. */
// @route   DELETE /api/v1/videos/:id
// @access  Private
exports.deleteVideo = async (req, res, next) => {

    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        
    } catch (err) {
        return next(new HttpError('Something went wrong, deleting video failed.', 500));
    }

    if (!video) {
        return next(new HttpError('No video found with that ID', 404))
    }
            
    res.status(204).json({
        status: 'success',
        data: null
    });
};