
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

const geocode = require('./utilities/geocode');
const forecast = require('./utilities/forecast');

console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views paths
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', ((req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Rick Glascock'
  });
}));

app.get('/about', ((req, res) => {
  res.render('about', {
    title: "About",
    name: "Rick Glascock"
  });
}))

app.get('/help', ((req, res) => {
  res.render('help', {
    title: "Help",
    name: "Rick Glascock",
    helpMessage: "This is an app built with Node.js served with Express. Enter a location as a string and the app will return an updated forecast,"
  })
}))

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    })
  }

  geocode(req.query.address, (error, {lat, long, location} = {'blah': 'boo'}) => {
    if(error) {
      return res.send({ error });
    }

      forecast(lat, long, (error, forecastData) => {        
        if(error) {
          return res.send({ error });
        }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', ((req, res) => {
  res.render('404', {
    title: "Error - 404",
    name: "Rick Glascock",
    errorMessage: 'Help article not found'
  })
}));

app.get('*', ((req, res) => {
  res.render('404', {
    title: "Error - 404",
    name: "Rick Glascock",
    errorMessage: 'My 404 - Page not found'
  })
}));

app.listen(port, () => {
  console.log('Server is up on: ' + port);
})