const APIKey = "451e60a05a73232b3bf03933f49433c3";

// create the buttons for previously-searched cities
function createCityButton(city) {
    let button = document.createElement("button");
    let buttonListElement = document.createElement("li");
    let buttonList = document.getElementById("button-list");

    button.innerHTML = city;
    button.setAttribute("class", "city-button");
    buttonListElement.appendChild(button);
    buttonList.appendChild(buttonListElement);
};

// save previously-searched cities to local storage
function saveCity(city) {
    let cities = JSON.parse(localStorage.getItem("cities"));
    if (!cities) cities = [];
    for(let i = 0; i < cities.length; i++) {
        if (city === cities[i]) {
            return;
        };
    };
    cities.unshift(city);
    localStorage.setItem("cities", JSON.stringify(cities));
    createCityButton(city);
};

// loop through the API data to build and display each of the next 5 days forecasts,
// find and extract the same time of day from the API data for each of these forecasts, 
// and display on each card, (get the icon for the forecast and display it.)
function display5Day(response) {
    let forecastSection = document.getElementById("forecast-section");
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${response.lat}&lon=${response.lon}&appid=${APIKey}`;

    $(forecastSection).show(); // show the hidden 5-day forecast section

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            let fiveDayArray = [];
            let K = 273.15; // c = K - 273.15 (kelvin to centigrade conversion)
            
            for(let i = 0; i < 33; i+= 8) {
                let day = {
                date: response.list[i].dt_txt,
                icon: response.list[i].weather[0].icon,
                temp: (response.list[i].main.temp - K).toFixed(2),
                wind: response.list[i].wind.speed,
                humidity: response.list[i].main.humidity
                };

                let dateYear = day.date.slice(0, 4);
                let dateMonth = day.date.slice(5, 7);
                let dateDay = day.date.slice(8, 10);
                let dayTime = day.date.slice(11, 16);

                day.time = `${dayTime}`;             
                day.date = `${dateDay}/${dateMonth}/${dateYear}`;
                fiveDayArray.push(day);   
            };
            
            for (let i = 0; i < 5; i++) {
                let cardDate = document.getElementById(`card${i+1}-date`);
                let cardTime = document.getElementById(`card${i+1}-time`);
                // let cardIcon = document.getElementById(`card${i+1}-img-top`); // NOT WORKING CORRECTLY
                let cardIcon = document.getElementById(`card${i+1}-icon`);
                let cardTemp = document.getElementById(`card${i+1}-temp`);
                let cardWind = document.getElementById(`card${i+1}-wind`);
                let cardHumidity = document.getElementById(`card${i+1}-humidity`);
                
                cardDate.textContent = `(${fiveDayArray[i].date})`;// increment date for each card
                cardTime.textContent = `@${fiveDayArray[i].time}`;
                // cardIcon.textContent = `https://openweathermap.org/img/wn/${fiveDayArray[i].icon}.png`;
                // cardIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png"></img>`;
                cardTemp.textContent = `Temp: ${fiveDayArray[i].temp}\u00B0C`;
                cardWind.textContent = `Wind: ${fiveDayArray[i].wind} m/sec`;
                cardHumidity.textContent = `Humidity: ${fiveDayArray[i].humidity}%`;
                // console.log(cardIcon);                      
            };  
        });
        saveCity(response.name);
};

// use the API data to write to the screen for today's current forecast
function displayToday(response) {
    let todaysDate = moment();
    const $todaySection = $("#today-section");
    const $cityDisplay = $("#city");
    let todayTempDisplay = document.getElementById("today-temp");
    let todayHumidityDisplay = document.getElementById("today-humidity");
    let todayWindSpeedDisplay = document.getElementById("today-wind-speed");

    $todaySection.show(); // show the hidden today section
    $cityDisplay.textContent = `${response.city} (${todaysDate.format("DD/MM/YYYY")})`;
    todayTempDisplay.textContent = `Temp: ${response.temp}\u00B0C`;
    todayHumidityDisplay.textContent = `Humidity: ${response.humidity}%`;
    todayWindSpeedDisplay.textContent = `Wind: ${response.windSpeed} m/s`;
    display5Day(response);
};

// send off the initial API call to obtain the latitude and longitude of the
// searched city, and extract today's data from it to display on today's forecast
function getLatAndLon(searchCity) {
    let queryLatLon = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&mode=json&units=metric&appid=${APIKey}`;    

    $.ajax({
        url: queryLatLon,
        method: "GET"
        }).then(function(response) {
            let todayAndLatLon = {
                city: response.name,
                temp: response.main.temp,
                humidity: response.main.humidity,
                windSpeed: response.wind.speed,
                lat: response.coord.lat,
                lon: response.coord.lon
            };
            displayToday(todayAndLatLon);
            // display5Day(todayAndLatLon);
            // saveCity(response.name);
        });
};

// retrieve list of previously-searched cities from local storage
function getFromLocalStorage(){
    let citiesArray = JSON.parse(localStorage.getItem("cities")) || [];
    for(let i = 0; i < citiesArray.length; i++) {
        createCityButton(citiesArray[i]);
    };
};

// run function getFromLocalStorage to start the process of displaying
// previously-searched cities buttons
getFromLocalStorage();

// listen to the search button being clicked and extract the city name
// from the user city name search field, send it to the API call function
$("#search-button").on("click", function() {
    let searchCity = $("#search-input").val();
    $("#search-input").val("");
    getLatAndLon(searchCity);
});

// listen for the previously-searched city buttons, extract the city name of the
// button, send the city name to the API call function
$(".city-button").on("click", function(event) {
    let searchCity = event.target.innerHTML;
    getLatAndLon(searchCity);
});

// listen for the 'clear previously-searched city buttons' to be clicked,
// clear the local storage of the searched cities, hide the buttons from 
// the display.
$("#clear-button").on("click", function() {
    localStorage.clear();
    let clearHistoryButtons = getElementById("button-list");
    $(clearHistoryButtons).hide();
});