const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      request = require('request-promise'),
      port = 3000,
      app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const apikey = 'fbb1d04a44a8642c3c6fae9fa3faf2da';
  const options = {
    uri: `http://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.long}&appid=${apikey}&units=metric`,
    json: true
  }
  const weather = {};
  request(options)
    .then( response => {
      weather.temp = response.main.temp;
      weather.minTemp = response.main.temp_min;
      weather.maxTemp = response.main.temp_max;
      weather.city = response.name;
      weather.country = response.sys.country;
      res.json(weather);
    })
    .catch( err => console.log(`Error`));
})

app.listen(port, () => {
  console.log('Weather Application is running on port 3000')
})
