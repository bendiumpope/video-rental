let videoRate = {
    "regular" : 10,						
    "children-movie" : 8, 						
    "new-release" : 15 

}

exports.calVideoPrice = (videoType) => {

    return videoRate[videoType];
}

exports.videoRentalPrice = (videoType, numDays, options) => {
    
    if (videoType === 'regular') {

        return videoRate[videoType] * numDays;

    } else if (videoType === 'children-movie') {

        return ((videoRate[videoType] * numDays) + (options.maximumAge / 2));

    } else {

        return ((videoRate[videoType] * numDays) - (new Date() - new Date(options.years)));    
    }
    
}