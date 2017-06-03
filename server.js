const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      request = require('request-promise'),
      helmet = require('helmet'),
      ms = require('ms'),
      dotenv = require('dotenv').config(),
      port = process.env.PORT || 8080,
      app = express();


app.use(helmet.hsts({
  maxAge: ms('1y'),
  includeSubDomains: true,
  preload: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const apikey = process.env.APIKEY;
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
    .catch( err => console.log(`Error: `, err));
})

app.listen(port, () => {
  console.log(`Weather Application is running on port:${port}`)
})
