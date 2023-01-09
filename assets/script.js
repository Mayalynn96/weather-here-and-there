// Geolocation the user on page reload
var lon;
var lat;

var locationEl = document.getElementById("yourLocation");

// getting coordinates
function getUserCoordinates() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
}

// Grabbing coordinates and turning them into the api link to get city name
function showPosition(position) {
  lon = position.coords.longitude;
  lat = position.coords.latitude;
  locationApiUrl = "http://api.openweathermap.org/geo/1.0/reverse?lat=" + lat + "&lon=" + lon + "&limit=1&appid=a8a24a0664c1c73300a989d7368f05da";
  getLocation();
}

getUserCoordinates()

var locationApiUrl;

// Getting the city name and changing the city to this location and changing the header info
function getLocation() {
    fetch(locationApiUrl).then(function (response) {
        return response.json();
      })
      .then(function (data) {
        locationEl.innerHTML = "Your Location is: " + data[0].name;
        cityName = data[0].name
        changeCity();
      });
}

var cityName = "Los Angeles";

// Changes made when the city is changed
function changeCity() {
    currentWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=a8a24a0664c1c73300a989d7368f05da"
    weatherForecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=a8a24a0664c1c73300a989d7368f05da"
    getCurrentWeather();
    getWeatherForecast();
}

// URL for current weather 
var currentWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=a8a24a0664c1c73300a989d7368f05da"
var currentWeather;
getCurrentWeather();

// Fetching current day weather
function getCurrentWeather() {
    fetch(currentWeatherApiUrl).then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var iconLink = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        document.getElementById("day0").textContent = "The Weather today in " + cityName;
        document.querySelector("#bigWidget").setAttribute("src", iconLink);
        document.getElementById("temp0").textContent = "Temperature: " + data.main.temp + "°F",
        document.getElementById("wind0").textContent = "Wind: " + data.wind.speed + " MPH",
        document.getElementById("humidity0").textContent = "Humidity: " + data.main.humidity + "%"
      });
}

// URL for 5 days weather forecast
var weatherForecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=a8a24a0664c1c73300a989d7368f05da"
var weatherForecast = [];
getWeatherForecast();

// Fetsching weather forecast
function getWeatherForecast() {
    fetch(weatherForecastApiUrl).then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
        function generateweatherforecast(index1, index2) {
            var iconLink = "http://openweathermap.org/img/wn/" + data.list[index1].weather[0].icon + "@2x.png"
            document.querySelectorAll(".date")[index2].textContent = dayjs.unix(data.list[index1].dt).format("M/D/YYYY");
            document.querySelectorAll(".smallWidget")[index2].setAttribute("src", iconLink);
            document.querySelectorAll(".temp")[index2].textContent = "Temperature: " + data.list[index1].main.temp + "°F";
            document.querySelectorAll(".wind")[index2].textContent = "Wind: " + data.list[index1].wind.speed + " MPH";
            document.querySelectorAll(".humidity")[index2].textContent = "Humidity: " + data.list[index1].main.humidity + "%";
        }

        generateweatherforecast(1, 0);
        generateweatherforecast(9, 1)
        generateweatherforecast(17, 2)
        generateweatherforecast(25, 3)
        generateweatherforecast(33, 4)
      });
}


// TODO: make weather change according to city input
// - make apis url var
// - get information from Api
// - save info into corresponding vars
// - populate apropriate items on page
// - Do this for both current day and 5 days forecast

// TODO: Create button generation and change city on selection
document.getElementById("search").addEventListener("click", function () {
    cityName = document.getElementById("cityInput").value
    changeCity();
})
// - take user input and cross check with database
// - add jQuery autocomplete widget
// - save to local storage
// - create button on page
// - link button to changeCity