var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var http = require('http');
var apiKey = '5db618f01bf7f3a739eb81372c3ddce9'

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static('public'));

app.get('/weather', function(req, res){
  res.render('weather');
});

app.get('/weather/:city', function(request, response){
  http.get('http://api.openweathermap.org/data/2.5/weather?q='+request.params.city + '&units=metric&appid=' + apiKey, function(res){ 
    var body = "";
    res.on('data', function(d){
      body += d;
    });
    res.on('end', function(){
      var cityWeather = JSON.parse(body);
      response.send(cityWeather);
    });
  });
});



app.listen('3000', function(){
  console.log('serving on port 3000');
})