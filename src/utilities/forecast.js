const request = require('request');

const weatherAccessKey = '955f4360db810b737228b3305fadd113';

// http://api.weatherstack.com/current?access_key=955f4360db810b737228b3305fadd113&query=44.3490,-68.8155


const forecast = (lat, long, callback) => {
  const url =
    `http://api.weatherstack.com/current?access_key=${weatherAccessKey}&query=${lat},${long}&units=f`

  request({
    url,
    json: true
  }, (error, {body}) => {
    if (error) {
      callback('This API is currently unavailable. Try again later.', undefined)
    } else if (error) {
      callback('Cannot find location. Try again', undefined)
      // console.log();
    } else {
      console.log(body);
      
      const {temperature, feelslike, wind_speed, weather_descriptions, humidity, weather_icons} = body.current
      callback(undefined, {
        temperature,  
        feelslike,
        wind_speed,
        weather_descriptions,
        humidity,
        weather_icons
      })
    }
  })
}

module.exports = forecast;