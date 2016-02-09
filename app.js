var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var http = require('http');


app.set('views', './views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static('public'));

app.get('/weather', function(req, res){
  res.render('weather');
});





app.listen('3000', function(){
  console.log('serving on port 3000');
})