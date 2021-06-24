const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const { createVideo, getAllVideos, getVideo, updateVideo, deleteVideo } = require('../controllers/videoController');

const router = express.Router();

router.get('/videolist', getAllVideos)

///PROTECTED ROUTES
router.use(checkAuth);
router.post('/',createVideo);

router
    .route('/:id')
    .get(getVideo)
    .patch(updateVideo)
    .delete(deleteVideo); 

module.exports = router;