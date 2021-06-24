let videoRate = {
    "regular" : 10,						
    "children-movie" : 8, 						
    "new-release" : 15 

}

/* @desc    This function returns the price associated to a given video type*/
exports.calVideoPrice = (videoType) => {

    return videoRate[videoType];
}

/* @desc    This function calculates the price of renting a given video type 
for a given day number of days*/
exports.videoRentalPrice = (videoType, numDays, options) => {
    
    if (videoType === 'regular') {

        return videoRate[videoType] * numDays;

    } else if (videoType === 'children-movie') {

        return ((videoRate[videoType] * numDays) + (options.maximumAge / 2));

    } else {

        return ((videoRate[videoType] * numDays) - (new Date() - new Date(options.years)));    
    }
    
}