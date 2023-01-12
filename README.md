# weather-here-and-there

## Description

This website serves as a weather app to let the user know what the weather is like currently and the next 5 days for the users city and any valid location they input. This served as api, javascript and css training. I was able to learn more about apis and how they work.

## Installation

N/A

## Usage

To visit my website go to the following URL: https://mayalynn96.github.io/weather-here-and-there/

When the page loads it will give the user the default location weather wich is set to Los Angeles. If the user clicks on the text in the top right corner it will ask them to allow the page to get the users location accordin to their position. If the user agrees, the location and weather will change accordingly and will check for position on each page load. If the user blocks the promt nothing changes and the user location stays at default.

![Gif of user location feature](./assets/README%20images/userLocation.gif)

The current date, time and weather is displayed with the temperature, wind, humidity and icons/backgrounds representing the weather accordingly. the 5 day forcast underneath has a similar look but doesn't have backgrounds. 

When the user searches for a location a button containing that city name is added to the search history. If a button is clicked the location and weather is set to it's value. The search history is saved so it apears on page reload. The user can input a city alone or add two letter state code and country code or just a country code seperated by a coma in the following format (not case sensitive):

Chicago <br>
Chicago, US <br>
Chicago, IL, US

![Gif of city search history feature](./assets/README%20images/citySearchHistory.gif)

If a city that has already been saved is entered, the weather will change but no button will be added. If the user input isn't a valid location an alert will promt the user to enter a valid location and it won't be saved to city history. If the user clicks on the set user location it will check location and set the city and weather accordingly.

![Gif of city history exeptions and set user location](./assets/README%20images/cityExeptions.gif)

## Credits

N/A

## License
N/A