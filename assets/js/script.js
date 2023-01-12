// Geolocation the user on page reload
var lon;
var lat;

var cityHistoryString = localStorage.getItem("cityHistory")
var cityHistory = JSON.parse(cityHistoryString) || [];
var defaultCity = "Los Angeles";
var cityName = defaultCity;
var locationAllowed = localStorage.getItem("locationAllowed") || false;

var locationEl = document.getElementById("yourLocation");

// Gets user location on page load
if (locationAllowed) {
    getUserCoordinates()
}

// Lets the user set their current location
locationEl.addEventListener("click", function () {
    getUserCoordinates();
})

// getting coordinates
function getUserCoordinates() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

// Grabbing coordinates and turning them into the api link to get city name
function showPosition(position) {
    locationAllowed = true;
    localStorage.setItem("locationAllowed", locationAllowed)
    lon = position.coords.longitude;
    lat = position.coords.latitude;
    locationApiUrl = "https://api.openweathermap.org/geo/1.0/reverse?lat=" + lat + "&lon=" + lon + "&limit=1&appid=a8a24a0664c1c73300a989d7368f05da";
    getLocation();
}

var locationApiUrl;

// Getting the city name and changing the city to this location and changing the header info
function getLocation() {
    fetch(locationApiUrl).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            cityName = data[0].name + ", " + data[0].country
            locationEl.innerHTML = "Your Location is: " + cityName;
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

// Gets current weather for defaultCity if location isn't set
getCurrentWeather();
// Fetching current day weather
function getCurrentWeather() {
    fetch(currentWeatherApiUrl).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            // Getting and setting current date
            document.getElementById("currentDate").textContent = dayjs.unix(data.dt).format("HH:mm - dddd M/D/YYYY");
            // Getting icon
            var iconLink = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"

            // changing backgrounds according to icon (default = rainy1)
            var backgroundEl = document.getElementById("today")
            if (data.weather[0].icon === "01d") {
                backgroundEl.style.backgroundImage = "url(assets/images/sunny.png)"
            } else if (data.weather[0].icon === "01n") {
                backgroundEl.style.backgroundImage = "url(assets/images/clearnight.png)"
            } else if (data.weather[0].icon === "02n" || data.weather[0].icon === "02d") {
                backgroundEl.style.backgroundImage = "url(assets/images/lightclouds.png)"
            } else if (data.weather[0].icon === "03n" || data.weather[0].icon === "03d") {
                backgroundEl.style.backgroundImage = "url(assets/images/moreclouds.png)"
            } else if (data.weather[0].icon === "04n" || data.weather[0].icon === "04d") {
                backgroundEl.style.backgroundImage = "url(assets/images/clouds.png)"
            } else if (data.weather[0].icon === "09n" || data.weather[0].icon === "09d") {
                backgroundEl.style.backgroundImage = "url(assets/images/rainy2.png)"
            } else if (data.weather[0].icon === "10n" || data.weather[0].icon === "10d") {
                backgroundEl.style.backgroundImage = "url(assets/images/rainy1.png)"
            } else if (data.weather[0].icon === "11n" || data.weather[0].icon === "11d") {
                backgroundEl.style.backgroundImage = "url(assets/images/storm.png)"
            } else if (data.weather[0].icon === "13n" || data.weather[0].icon === "13d") {
                backgroundEl.style.backgroundImage = "url(assets/images/snow.jpg)"
            } else if (data.weather[0].icon === "50n" || data.weather[0].icon === "50d") {
                backgroundEl.style.backgroundImage = "url(assets/images/fog.png)"
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

// Gets 5 Days Forecast for defaultCity if location isn't set
getWeatherForecast();
// Fetsching weather forecast
function getWeatherForecast() {
    fetch(weatherForecastApiUrl).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            // Function to retrieve the right data for the right day
            function generateweatherforecast(index1, index2) {
                var iconLink = "https://openweathermap.org/img/wn/" + data.list[index1].weather[0].icon + "@2x.png"
                document.querySelectorAll(".date")[index2].textContent = dayjs.unix(data.list[index1].dt).format("M/D/YYYY - ddd - HH:mm");
                document.querySelectorAll(".smallWidget")[index2].setAttribute("src", iconLink);
                document.querySelectorAll(".temp")[index2].textContent = "Temperature: " + data.list[index1].main.temp + "°F";
                document.querySelectorAll(".wind")[index2].textContent = "Wind: " + data.list[index1].wind.speed + " MPH";
                document.querySelectorAll(".humidity")[index2].textContent = "Humidity: " + data.list[index1].main.humidity + "%";
            }
            // Getting Weather for each day
            generateweatherforecast(0, 0);
            generateweatherforecast(8, 1)
            generateweatherforecast(16, 2)
            generateweatherforecast(24, 3)
            generateweatherforecast(32, 4)
        });
}



// button generation and change city on selection
document.getElementById("search").addEventListener("click", function () {

    cityName = document.getElementById("cityInput").value
    changeCity();
    // Empties the city input value
    document.getElementById("cityInput").value = '';
    fetch(weatherForecastApiUrl).then(function (response) {
        // checks weather the city excists in the database
        if (response.ok === true) {
            getCurrentWeather();
            getWeatherForecast();
            // check if it already has been saved
            if (cityHistory.includes(cityName)) {
                return;
            } else {
                searchHistoryEl.style.display = "block"
                saveCity();
            }
        } else {
            alert("⚡ Please enter a valid location ⚡")
        }
    })

})

// save city searched to local storage
function saveCity() {
    cityHistory.push(cityName);
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
    createNewBtn(cityName);
}

// Create new city button when a new city is searched
function createNewBtn(content) {
    var newBtn = document.createElement("button");
    newBtn.setAttribute("class", "pastCity")
    newBtn.textContent = content;
    newBtn.addEventListener("click", function () {
        cityName = this.textContent;
        changeCity();
        getCurrentWeather();
        getWeatherForecast();
    })
    searchHistoryEl.appendChild(newBtn)
}

// Creating saved buttons on pageload
var searchHistoryEl = document.getElementById("searchHistory")

function createHistoryBtns() {
    for (var i = 0; i < cityHistory.length; i++) {
        createNewBtn(cityHistory[i]);

    }
}

// makes cityHistory apear on pageload
createHistoryBtns();
// if no cities are saved the reset button disapears
if (cityHistory.length <= 0) {
    searchHistoryEl.style.display = "none";
}

// Reset Search History Btn
document.getElementById("resetBtn").addEventListener("click", function () {
    localStorage.removeItem("cityHistory")
    cityHistory = [];
    searchHistoryEl.style.display = "none"
    var allSavedCities = document.querySelectorAll(".pastCity")
    for (var i = 0; i < allSavedCities.length; i++) {
        allSavedCities[i].remove()
    }
})

