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
  console.log(locationApiUrl)
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

// TODO: Create button generation and change city on selection
// - take user input and cross check with database
// - add jQuery autocomplete widget
// - save to local storage
// - create button on page
// - link button to changeCity

// Changes made when the city is changed
function changeCity() {
    document.getElementById("day0").textContent = "The Weather today in " + cityName + "⛅";
    currentWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=a8a24a0664c1c73300a989d7368f05da"
    getCurrentWeather();
    console.log(currentWeatherApiUrl)
}

// TODO: make weather change according to city input
// - make apis url var
// - get information from Api
// - save info into corresponding vars
// - populate apropriate items on page
// - Do this for both current day and 5 days forecast

// URL for current weather 
var currentWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=los%20angeles&units=imperial&appid=a8a24a0664c1c73300a989d7368f05da"



var currentWeather;
getCurrentWeather();


// Fetching current day weather
function getCurrentWeather() {
    fetch(currentWeatherApiUrl).then(function (response) {
        return response.json();
      })
      .then(function (data) {
        currentWeather = {
            temp: data.main.temp + "°F",
            wind: data.wind.speed + "MPH",
            humidity: data.main.humidity + "%"
        }
        console.log(data)
        console.log(currentWeather);
        populateWeather()
      });
}

function populateWeather() {
    document.getElementById("temp0").textContent = "Temperature: " + currentWeather.temp;
    document.getElementById("wind0").textContent = "Wind: " + currentWeather.wind;
    document.getElementById("humidity0").textContent = "Humidity: " + currentWeather.humidity;
}
