
const request = require('request')
var API_KEY = '711ca4d8aed719c2e873db028ac5e765'
const forecast = (latitude, longitude, callback) => {
    //const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
    const url = `https://api.openweathermap.org/data/2.5/weather?`+`lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    
    request({ url, json: true }, (error, response, body) => {

                if (error) {
                    callback('Unable to connect to weather service!', undefined)
                } else if (body.error) {
                    callback('Unable to find location', undefined)
                   
                } else {
                    
                  
                    //callback(undefined, 'Good')
                    callback(undefined, body.weather[0].main + ' It is currently ' + body.main["temp"] + ' degress out. There is a speed of ' + body.wind["speed"] + '  of the wind')
                }
            })
        }
        
        module.exports = forecast
        






















// const request = require('request')
// var API_KEY = '711ca4d8aed719c2e873db028ac5e765'
// const forecast = (latitude, longitude, callback) => {
//     //const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
//     const url = `api.openweathermap.org/data/2.5/weather?`+`lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    
//     request({ url: url, json: true }, (error,  {body} ) => {

//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (body.error) {
//             callback('Unable to find location', undefined)
           
//         } else {
            
//             callback(undefined, 'Good')
//             //callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
//         }
//     })
// }

// module.exports = forecast
