// Geolocation the user on page reload
var lon;
var lat;

var cityHistoryString = localStorage.getItem("cityHistory")
var cityHistory =  JSON.parse(cityHistoryString) || [];
var defaultCity = "Los Angeles";
var savedUserCity = localStorage.getItem("savedUserCity")
var cityName = localStorage.getItem(savedUserCity) || defaultCity;


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

if(savedUserCity === null){
    getUserCoordinates();
} else {
    cityName = savedUserCity;
    locationEl.innerHTML = "Your Location is: " + cityName
}

var locationApiUrl;

// Getting the city name and changing the city to this location and changing the header info
function getLocation() {
    fetch(locationApiUrl).then(function (response) {
        return response.json();
      })
      .then(function (data) {
        locationEl.innerHTML = "Your Location is: " + data[0].name;
        cityName = data[0].name
        localStorage.setItem("savedUserCity", cityName)
        changeCity();
        getCurrentWeather();
        getWeatherForecast();
      });
}


// Changes made when the city is changed
function changeCity() {
    currentWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=a8a24a0664c1c73300a989d7368f05da"
    weatherForecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=a8a24a0664c1c73300a989d7368f05da"
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

        // changing backgrounds according to icon (default = rainy1)
        var backgroundEl = document.getElementById("today")
        if(data.weather[0].icon === "01d") {
            backgroundEl.style.backgroundImage = "url(assets/images/sunny.png)"
        } else if(data.weather[0].icon === "01n") {
            backgroundEl.style.backgroundImage = "url(assets/images/clearnight.png)"
        } else if(data.weather[0].icon === "02n" || data.weather[0].icon === "02d") {
            backgroundEl.style.backgroundImage = "url(assets/images/lightclouds.png)"
        } else if(data.weather[0].icon === "03n" || data.weather[0].icon === "03d") {
            backgroundEl.style.backgroundImage = "url(assets/images/moreclouds.png)"
        } else if(data.weather[0].icon === "04n" || data.weather[0].icon === "04d") {
            backgroundEl.style.backgroundImage = "url(assets/images/clouds.png)"
        } else if(data.weather[0].icon === "09n" || data.weather[0].icon === "09d") {
            backgroundEl.style.backgroundImage = "url(assets/images/rainy2.png)"
        } else if(data.weather[0].icon === "10n" || data.weather[0].icon === "10d") {
            backgroundEl.style.backgroundImage = "url(assets/images/rainy1.png)"
        } else if(data.weather[0].icon === "11n" || data.weather[0].icon === "11d") {
            backgroundEl.style.backgroundImage = "url(assets/images/storm.png)"
        }  else if(data.weather[0].icon === "13n" || data.weather[0].icon === "13d") {
            backgroundEl.style.backgroundImage = "url(assets/images/snow.jpg)"
        }  else if(data.weather[0].icon === "50n" || data.weather[0].icon === "50d") {
            backgroundEl.style.backgroundImage = "url(assets/images/fog.jpg)"
        }  



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
        // Function to retrieve the right data for the right day
        function generateweatherforecast(index1, index2) {
            var iconLink = "http://openweathermap.org/img/wn/" + data.list[index1].weather[0].icon + "@2x.png"
            document.querySelectorAll(".date")[index2].textContent = dayjs.unix(data.list[index1].dt).format("M/D/YYYY");
            document.querySelectorAll(".smallWidget")[index2].setAttribute("src", iconLink);
            document.querySelectorAll(".temp")[index2].textContent = "Temperature: " + data.list[index1].main.temp + "°F";
            document.querySelectorAll(".wind")[index2].textContent = "Wind: " + data.list[index1].wind.speed + " MPH";
            document.querySelectorAll(".humidity")[index2].textContent = "Humidity: " + data.list[index1].main.humidity + "%";
        }
        // Getting Weather for each day
        generateweatherforecast(6, 0);
        generateweatherforecast(14, 1)
        generateweatherforecast(22, 2)
        generateweatherforecast(30, 3)
        generateweatherforecast(38, 4)
      });
}   
        


// button generation and change city on selection
document.getElementById("search").addEventListener("click", function () {
    
    cityName = document.getElementById("cityInput").value
    changeCity();
    fetch(weatherForecastApiUrl).then(function (response) {
        if(response.ok === true) {
            getCurrentWeather();
            getWeatherForecast();
            if(cityHistory.includes(cityName)){
                return;
            } else {
                searchHistoryEl.style.display = "block"
                saveCity(); 
            }
        }
      })

})

// - save to local storage
function saveCity(){
    cityHistory.push(cityName);
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
    createNewBtn(cityName);
}

function createNewBtn(content) {
    var newBtn = document.createElement("button");
        newBtn.setAttribute("class", "pastCity")
        newBtn.textContent = content;
        newBtn.addEventListener("click", function() {
            cityName = this.textContent;
            changeCity();
            getCurrentWeather();
            getWeatherForecast();
        })
        searchHistoryEl.appendChild(newBtn)
}
// - create button on page
var searchHistoryEl = document.getElementById("searchHistory")

function createHistoryBtns() {
    for(var i = 0; i < cityHistory.length; i++){
        createNewBtn(cityHistory[i]);
        
    }
}
// - link button to changeCity

createHistoryBtns();
if(cityHistory.length <= 0){
    searchHistoryEl.style.display = "none";
}

// Reset Search History Btn
document.getElementById("resetBtn").addEventListener("click", function() {
    cityHistory = [];
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
    searchHistoryEl.style.display = "none"
    var allSavedCities = document.querySelectorAll(".pastCity")
    for(var i = 0; i < allSavedCities.length; i++) {
        allSavedCities[i].remove()
    }
})

