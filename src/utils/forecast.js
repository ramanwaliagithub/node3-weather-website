const request = require('request')

/*  Following code is using callback functionality tio reuse the code */
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d1f7e2d333b8c9e65ac663d43ecefe3c&query='+lat+','+long+'&units=m'
    // Object property destruction usage - I did not made changes in geocode.js file for previous reference
    //request({ url: url, json: true}, (error, response) => {
    request({ url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Please specify a valid location identifier using the query parameter.', undefined)
        } else {
            callback (undefined, {
                name: body.location.name,
                country: body.location.country,
                latitude: body.location.lat,
                longitude: body.location.lon,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                current: body.current.weather_descriptions[0] + ' throughout the day. Temperature is ' + body.current.temperature + ' and feels like ' + body.current.feelslike + ' and ' + body.current.precip + '% chance of rain.' + 'The humidity is ' + body.current.huidity + '%.'
            })
        }
    })
}

module.exports = forecast