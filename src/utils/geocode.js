const request = require('request')

/*  Following code is using callback functionality tio reuse the code */
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFtYW4wMDkiLCJhIjoiY2t2cnNxczkzMW4yMjJvcWh6em9nbnVsNyJ9.d3-Br89SK97V7XlcoNU3Zw&limit=1'
    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try with another search term.', undefined)
        } else {
            callback (undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode