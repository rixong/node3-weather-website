
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const weatherIcon = document.querySelector('#weather-icon');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log(search.value);
  message1.textContent = `Loading...`;
  message2.textContent = ``;
  weatherIcon.src = ''

  fetch(`/weather?address=${search.value}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        // console.log(data.error)
        message1.textContent = data.error
      } else {
        // console.log(data)
        // console.log(location)
        message1.textContent = `Forecast for: ${data.location}`;
        message2.textContent = `${data.forecast.weather_descriptions[0]} - Wind speed is ${data.forecast.wind_speed}mph. 
          At ${data.forecast.humidity}% humidity, it feels like ${data.forecast.feelslike} degrees.`;
        weatherIcon.src = data.forecast.weather_icons[0];
      }
    })
})
