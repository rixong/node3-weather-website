const request = require('request')

const geolocationAccessKey = 'pk.eyJ1Ijoicml4b25nIiwiYSI6ImNrYjNsbG83MzBtbTUydG10NTdxbzZ1M3oifQ.-j3Z1Rft-Da_mhebmjlvbQ';

const geocode = (address, callback) => {
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${geolocationAccessKey}&limit=1`
  
  request({ url, json: true }, (error, { body }) => {
      if (error) {
        callback('This API is currently unavailable. Try again later.', undefined);
      } else if (body.features.length === 0) {
        callback('Cannot find address. Try again', undefined);
      } else {     
        callback(undefined, {
          long: body.features[0].center[0], 
          lat: body.features[0].center[1],
          location: body.features[0].place_name
        })
      }
    })
}

module.exports = geocode;

// `https://api.mapbox.com/geocoding/v5/mapbox.places/austin.json?access_token=pk.eyJ1Ijoicml4b25nIiwiYSI6ImNrYjNsbG83MzBtbTUydG10NTdxbzZ1M3oifQ.-j3Z1Rft-Da_mhebmjlvbQ'&limit=1`