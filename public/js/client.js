var City = function(name){
  this.url = 'http://localhost:3000/weather/' + name;
  this.data;
}

City.prototype = {

  get: function(callback){
    var self = this;
    var request = new XMLHttpRequest();
    request.open('GET', this.url);
    request.onload = function(){
      self.data = JSON.parse(request.responseText);
      callback();
    }
    request.send(null);
  }
}


window.onload = function(){

  var form = document.querySelector('#citySearch');
  var input = document.querySelector('#cityInput');
  var cityView = document.querySelector('#weatherDisplay');
  var storedCitiesView = document.querySelector('#storedCities');

  var cities = JSON.parse(localStorage.getItem('cities')) || [];

  var displayCities = function(){
    storedCitiesView.innerHTML = "";
    for (city in cities){
      var data = cities[city];

      var li = document.createElement('li');
      li.innerHTML = data.name + "<button class='removeCity' data-id='" + city + "'>Remove City</button>";

      storedCitiesView.appendChild(li);
    }
  };
  

  form.onsubmit = function(event) {
    event.preventDefault();
    var name = input.value;
    var currentCity = new City(name);

    currentCity.get(function(){
      var data = currentCity.data;
      var cityDisplay = "<h3> In " + data.name + "</h3><h4> the forecast is : " + data.weather[0].main + "</h4><img src=' http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>";
      cityView.innerHTML = cityDisplay;

      document.querySelector('#addCity').onclick = function(){
        cities.push(data);
        localStorage.setItem('cities', JSON.stringify(cities));
        displayCities();
      }



    });
  }

  displayCities();

}




