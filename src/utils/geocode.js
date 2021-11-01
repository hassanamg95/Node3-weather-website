const request = require('request')

const geocode = (address, callback) => {
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(address) + '&APPID=711ca4d8aed719c2e873db028ac5e765'
   
    request({ url:url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.cod === '404') {
           callback('Unable to find location. Try another search.', undefined)
        }
 
        else {
            callback(undefined, {
                latitude: body.coord['lat'],
                longitude: body.coord['lon'],
                location: body.sys['country']
            })
        }    
        
    })
    
}

module.exports = geocode